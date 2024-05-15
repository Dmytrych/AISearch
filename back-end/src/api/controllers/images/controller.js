import {getImageByName} from "../../../lib/images/index.js";

export async function getByName(req, res) {
    return await getImageByName(req.params.fileName, process.env.IMAGE_STORAGE_URL, res)
}
