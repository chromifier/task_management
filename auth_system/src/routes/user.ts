import { Router } from 'express';
import { registerUser, loginUser, getUserDetails } from '../controllers/user';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/details', authMiddleware, getUserDetails);

export default router;
