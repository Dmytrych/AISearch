import {createImage, getImageByName} from "../../../lib/images/index.js";

export async function getByName(req, res) {
    const image = await getImageByName(req.params.fileName)

    res.setHeader('Content-Type', image.mimeType);
    res.send(image.content);
}

export async function addImage(req, res) {
    console.log(req.file)
    const { content, ...imageFields } = await createImage(req.file)

    res.json(imageFields);
}
