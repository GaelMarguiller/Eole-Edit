import { Router } from 'express';
import VideoFile from '../models/filesVideosModel';

const router = Router();

router.post('/', async (req, res) => {
    const { title, size, duration } = req.body;

    if (!title || !size || !duration) {
        return res
            .status(400)
            .send('File invalid');
    }

    const videoFile = await new VideoFile();
    videoFile.title = title;
    videoFile.duration = duration;
    videoFile.size = size;

    return videoFile;
});

export default router;
