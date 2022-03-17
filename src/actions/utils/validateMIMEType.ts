const videoMIMETypes = [
    'video/x-flv',
    'video/mp4',
    'video/mp4',
    'application/x-mpegURL',
    'video/MP2T',
    'video/3gpp',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-ms-wmv',
];

export default function validateMIMEType(mimeTypeSelectedFile: string): void {
    videoMIMETypes.map((videoMIMEType) => console.log(mimeTypeSelectedFile === videoMIMEType));
}
