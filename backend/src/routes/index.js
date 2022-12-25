import { Router } from 'express';
import ScoreCardRouter from './ScoreCard.js';
const router = Router();
router.use('/', ScoreCardRouter);
export default router