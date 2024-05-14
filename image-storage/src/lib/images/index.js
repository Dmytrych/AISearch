import {create as createImageInDb, getByName} from "../../repositories/images/index.js";
import {getFileExtension, getFilenameWithoutExtension, isImage} from "../common/index.js";
import * as crypto from "crypto";

export async function createImage(file) {
    if (!isImage(file)) {
        throw new Error("The provided file is not an image")
    }

    const fullFileName = file.originalname
    const extension = getFileExtension(fullFileName)
    const fileName = getFilenameWithoutExtension(fullFileName)

    return createImageInDb({
        fileName: `${crypto.randomUUID()}.${extension}`,
        originalFileName: fileName,
        extension,
        content: file.buffer,
        mimeType: file.mimetype
    });
}

export async function getImageByName(fileName) {
    if (!fileName) {
        throw new Error("The file name is empty")
    }

    return getByName(fileName)
}