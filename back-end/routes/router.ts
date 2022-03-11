import { Router } from 'express';
import uploadRoute from './uploadRoute';
import filesRoute from './filesRoute';

const router = Router();

router.use('/upload', uploadRoute);
router.use('/files', filesRoute);
