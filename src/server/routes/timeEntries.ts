import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

const timeEntrySchema = z.object({
  date: z.string(),
  clockIn: z.string(),
  breakStart: z.string().optional(),
  breakEnd: z.string().optional(),
  clockOut: z.string().optional(),
});

router.post('/', validateRequest(timeEntrySchema), async (req, res) => {
  const userId = req.user!.id;
  const timeEntry = await prisma.timeEntry.create({
    data: { ...req.body, userId },
  });
  res.json(timeEntry);
});

router.get('/', async (req, res) => {
  const userId = req.user!.id;
  const timeEntries = await prisma.timeEntry.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
  });
  res.json(timeEntries);
});

router.patch('/:id', validateRequest(timeEntrySchema.partial()), async (req, res) => {
  const { id } = req.params;
  const userId = req.user!.id;

  const timeEntry = await prisma.timeEntry.update({
    where: { id, userId },
    data: req.body,
  });
  res.json(timeEntry);
});

export { router as timeEntriesRouter };