import express, { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import { prisma } from '../index';
import { hibpService } from '../services/hibpService';
import { authenticateToken } from '../middleware/auth';
import rateLimit from 'express-rate-limit';

const router: Router = express.Router();

// Rate limit for breach checking - more restrictive
const breachCheckLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    error: 'Too many breach checks from this IP, please try again later.',
  },
});

// Check breaches for an email
router.post('/check', breachCheckLimit, [
  body('email').isEmail().normalizeEmail(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email } = req.body;

    // Check breaches from HaveIBeenPwned
    const breachData = await hibpService.checkBreaches(email);
    
    // Store breach check in database
    await prisma.breachCheck.create({
      data: {
        email,
        newBreaches: breachData?.length || 0,
      }
    });

    // If breaches found, store them in database
    if (breachData && breachData.length > 0) {
      for (const breach of breachData) {
        try {
          await prisma.breach.upsert({
            where: {
              email_breachName: {
                email,
                breachName: breach.Name,
              }
            },
            update: {
              // Update existing breach data
              domain: breach.Domain,
              breachDate: breach.BreachDate ? new Date(breach.BreachDate) : null,
              dataClasses: breach.DataClasses || [],
              description: breach.Description,
              isVerified: breach.IsVerified,
              pwnCount: breach.PwnCount,
            },
            create: {
              email,
              breachName: breach.Name,
              domain: breach.Domain,
              breachDate: breach.BreachDate ? new Date(breach.BreachDate) : null,
              dataClasses: breach.DataClasses || [],
              description: breach.Description,
              isVerified: breach.IsVerified,
              pwnCount: breach.PwnCount,
            }
          });
        } catch (breachError) {
          console.error(`Error storing breach ${breach.Name}:`, breachError);
        }
      }
    }

    res.json({
      email,
      breachCount: breachData?.length || 0,
      breaches: breachData || [],
      message: breachData?.length 
        ? `Found ${breachData.length} breach(es) for this email`
        : 'No breaches found for this email',
    });

  } catch (error) {
    console.error('Breach check error:', error);
    res.status(500).json({
      error: 'Failed to check breaches',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get breach history for an email
router.get('/history/:email', [
  param('email').isEmail().normalizeEmail(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email } = req.params;

    // Get stored breaches from database
    const breaches = await prisma.breach.findMany({
      where: { email },
      orderBy: { addedDate: 'desc' },
      select: {
        id: true,
        breachName: true,
        domain: true,
        breachDate: true,
        addedDate: true,
        dataClasses: true,
        description: true,
        isVerified: true,
        pwnCount: true,
      }
    });

    // Get check history
    const checkHistory = await prisma.breachCheck.findMany({
      where: { email },
      orderBy: { checkedAt: 'desc' },
      take: 10, // Last 10 checks
      select: {
        id: true,
        checkedAt: true,
        newBreaches: true,
      }
    });

    res.json({
      email,
      breachCount: breaches.length,
      breaches,
      checkHistory,
      lastChecked: checkHistory[0]?.checkedAt || null,
    });

  } catch (error) {
    console.error('Breach history error:', error);
    res.status(500).json({
      error: 'Failed to get breach history',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get all known breaches (public data from HIBP)
router.get('/all', async (req, res) => {
  try {
    const allBreaches = await hibpService.getAllBreaches();
    
    res.json({
      breachCount: allBreaches?.length || 0,
      breaches: allBreaches || [],
    });
    
  } catch (error) {
    console.error('Get all breaches error:', error);
    res.status(500).json({
      error: 'Failed to get breach data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 