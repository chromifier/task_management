import { Router } from 'express';
import { createTicket, getAllTickets } from '../controllers/ticket';

const router = Router();

router.post('/create', createTicket);   
router.post('/getAllTickets', getAllTickets);
// router.post('/update', updateTicket);

export default router;
