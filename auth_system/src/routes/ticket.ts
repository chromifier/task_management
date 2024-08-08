import { Router } from 'express';
import { createTicket, getTickets } from '../controllers/ticket';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/create', authMiddleware, createTicket);
router.get('/getTickets', getTickets);
// router.post('/update', updateTicket);

export default router;
