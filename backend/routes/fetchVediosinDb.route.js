import express from 'express';
import { fetchVediosinDb, hidePost, unhidePost, stories } from "../controllers/fetchVediosinDb.controller.js";
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/all', protectRoute, fetchVediosinDb);
router.post('/hide', protectRoute, hidePost);
router.put('/unhide', protectRoute, unhidePost);
router.get('/stories', protectRoute, stories);

export default router;
