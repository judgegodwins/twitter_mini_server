import express from 'express';
import AssetController from '../controllers/AssetController';

const router = express.Router();

router.get('/signature', AssetController.generateCloudinarySignature);

export default router;