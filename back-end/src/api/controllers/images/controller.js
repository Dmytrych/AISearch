import {getImageByName} from "../../../lib/images/index.js";

export async function getByName(req, res) {
    const image = await getImageByName(req.params.fileName)

    res.setHeader('Content-Type', image.mimeType);
    res.send(image.content);
}
