import express from 'express';

import authRouter from './authRouter';
import tweetRouter from './tweetRouter';
import followRouter from './followRouter';
import assetRouter from './assetRouter';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/tweet', tweetRouter);
router.use('/follows', followRouter);
router.use('/assets', assetRouter);

export default router;