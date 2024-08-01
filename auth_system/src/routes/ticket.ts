import { Router } from 'express';
import { createTicket } from '../controllers/ticket';

const router = Router();

router.post('/create', createTicket);
// router.post('/update', updateTicket);

export default router;
