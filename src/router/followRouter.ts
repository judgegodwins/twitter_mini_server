import express from 'express';
import FollowController from '../controllers/FollowController';

const router = express.Router();

router.post("/action", FollowController.followAction);
router.post("/data", FollowController.getFollowData);

export default router;