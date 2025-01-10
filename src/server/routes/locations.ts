import { Router } from 'express';
import { prisma } from '../db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const locations = await prisma.location.findMany({
      select: {
        id: true,
        name: true,
        branch: true,
        address: true,
        company: true
      }
    });
    
    console.log('지점 목록 조회:', locations);
    res.json(locations);
  } catch (error) {
    console.error('지점 목록 조회 실패:', error);
    res.status(500).json({ error: '지점 목록을 불러오는데 실패했습니다.' });
  }
});

export { router as locationRouter }; 