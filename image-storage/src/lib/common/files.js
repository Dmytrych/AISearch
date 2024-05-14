export function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

export function getFilenameWithoutExtension(filename) {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1) {
        return filename;
    } else {
        return filename.slice(0, lastDotIndex);
    }
}

export function isImage(file) {
    const imageMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/svg+xml',
        'image/bmp',
        'image/webp'
    ];

    return imageMimeTypes.includes(file.mimetype);
}