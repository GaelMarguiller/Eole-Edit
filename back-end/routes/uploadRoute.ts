import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

mongoose.connection.on('connected', () => {
    const { db } = mongoose.connection;
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'videoBucket' });
    console.log(bucket);
});

router.post('/', async (req, res) => {
    const { title, size, type } = req.body;
    if (!title || !size || !type) {
        return res
            .status(400)
            .send('File invalid');
    }
});

export default router;
