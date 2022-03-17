import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

mongoose.connection.on('connected', () => {
    const { db } = mongoose.connection;
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'videoBucket' });
    console.log(bucket);
});

router.post('/', async (req, res) => {
    console.log(req);
    console.log(req.body);
    const { title, size, type } = req.body;
    if (!title || !size || !type) {
        return res
            .status(400)
            .send('File invalid');
    }

    const videoFile = await new VideoFile();
    videoFile.title = title;
    videoFile.type = type;
    videoFile.size = size;

    return videoFile;
});

export default router;
