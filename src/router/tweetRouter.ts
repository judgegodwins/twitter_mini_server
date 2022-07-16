import express from 'express';
import TweetController from '../controllers/TweetController';
import { AuthenticatedRequest } from '../types/requests';

const router = express.Router();

router.use((req: AuthenticatedRequest, res) => { req.session = { userId: '162d80e0-1b1d-4f04-9142-068b7312c02a' } });

router.get('/get/:id', TweetController.getTweet);
router.post('/', TweetController.createTweet);
router.post('/retweet', TweetController.retweet);
router.post('/comments/create', TweetController.comment);
router.get('/comments', TweetController.getComments);
router.get('/parents', TweetController.getParents);
router.post('/likes/create', TweetController.likeTweet);
router.get('/likes', TweetController.getLikes);

export default router;