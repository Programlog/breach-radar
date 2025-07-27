import express, { Router } from 'express';
import { prisma } from '../index';
import { authenticateToken } from '../middleware/auth';

const router: Router = express.Router();

// Get user dashboard data
router.get('/', authenticateToken, async (req: any, res) => {
  try {
    const { email } = req.user;

    // Get user's breach summary
    const breachCount = await prisma.breach.count({
      where: { email }
    });

    // Get recent breaches
    const recentBreaches = await prisma.breach.findMany({
      where: { email },
      orderBy: { addedDate: 'desc' },
      take: 5,
      select: {
        id: true,
        breachName: true,
        domain: true,
        breachDate: true,
        addedDate: true,
        isVerified: true,
        pwnCount: true,
      }
    });

    // Get check history
    const checkHistory = await prisma.breachCheck.findMany({
      where: { email },
      orderBy: { checkedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        checkedAt: true,
        newBreaches: true,
      }
    });

    const lastCheck = checkHistory[0]?.checkedAt || null;
    const totalChecks = await prisma.breachCheck.count({
      where: { email }
    });

    const verifiedBreaches = await prisma.breach.count({
      where: { email, isVerified: true }
    });

    // Get unique domains affected
    const domainsAffected = await prisma.breach.findMany({
      where: { email, domain: { not: null } },
      select: { domain: true },
      distinct: ['domain']
    });

    res.json({
      user: {
        email,
      },
      summary: {
        totalBreaches: breachCount,
        verifiedBreaches,
        domainsAffected: domainsAffected.length,
        totalChecks,
        lastCheck,
      },
      recentBreaches,
      checkHistory,
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      error: 'Failed to load dashboard',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get detailed breach statistics
router.get('/stats', authenticateToken, async (req: any, res) => {
  try {
    const { email } = req.user;

    // Breach timeline
    const breachTimeline = await prisma.breach.findMany({
      where: { email },
      select: {
        breachDate: true,
        breachName: true,
        domain: true,
        pwnCount: true,
      },
      orderBy: { breachDate: 'asc' }
    });

    // compromised
    const allBreaches = await prisma.breach.findMany({
      where: { email },
      select: { dataClasses: true }
    });

    const dataClassCount: Record<string, number> = {};
    allBreaches.forEach(breach => {
      breach.dataClasses.forEach(dataClass => {
        dataClassCount[dataClass] = (dataClassCount[dataClass] || 0) + 1;
      });
    });

    // Monthly check
    const checks = await prisma.breachCheck.findMany({
      where: { email },
      select: {
        checkedAt: true,
        newBreaches: true,
      },
      orderBy: { checkedAt: 'desc' }
    });

    res.json({
      breachTimeline,
      dataClassStats: dataClassCount,
      checkActivity: checks,
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      error: 'Failed to load statistics',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 