import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index';

interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

// Middleware to authenticate JWT tokens
export async function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        error: 'Access token required'
      });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT secret is missing');
      return res.status(500).json({ error: 'Server config error' });
    }

    const decoded = jwt.verify(token, secret) as any;

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
      }
    });

    if (!user) {
      return res.status(401).json({
        error: 'User not found'
      });
    }

    // Add user info to request
    req.user = {
      userId: user.id,
      email: user.email,
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(403).json({
      error: 'Invalid or expired token'
    });
  }
};

// Optional authentication with or without token
export async function optionalAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        console.error('JWT_SECRET is not set. Cannot perform optional auth.');
        return next();
      }

      const decoded = jwt.verify(token, secret) as any;

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
        }
      });

      if (user) {
        req.user = {
          userId: user.id,
          email: user.email,
        };
      }
    }

    next();
  } catch (error) {
    // Continue without auth even if token is invalid for unprotected routes
    next();
  }
}; 