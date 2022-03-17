import axios from 'axios';
import { getApiUploadFile } from '../api/apiUrl';

export default async function uploadFile(file: FormData) {
    console.log(file);
    console.log(file.get('file'));
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const res = await axios.post(
        getApiUploadFile(),
        file,
        config,
    );
    console.log('toto');
    console.log(res.data);
    return res.data;
}
