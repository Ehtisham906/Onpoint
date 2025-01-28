import express from 'express';
import { signupAdmin, loginAdmin, logoutAdmin, checkAuthAdmin } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signupAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/check', protectRoute, checkAuthAdmin);

export default router;
