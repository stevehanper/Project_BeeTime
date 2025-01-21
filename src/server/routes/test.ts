import { Router } from 'express';
import { prisma } from '../db';

const router = Router();

router.get('/test-db', async (req, res) => {
  console.log('Received request for /test-db');
  try {
    const locations = await prisma.location.findMany();
    res.json(locations);
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

export { router as testRouter };