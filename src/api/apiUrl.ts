export function getRootApiUrl() {
    return 'http://localhost:3001/api';
}

export function getApiUploadFile() {
    return `${getRootApiUrl()}/upload`;
}

export function getApiListFile() {
    return `${getRootApiUrl()}/files`;
}

export function getApiFile(id: string) {
    return `${getApiListFile()}/${id}`;
}
