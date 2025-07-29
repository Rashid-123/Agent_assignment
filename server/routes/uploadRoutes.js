import express from 'express';
import { uploadAndDistribute } from '../controllers/uploadController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/', protect, uploadAndDistribute);

export default router;
