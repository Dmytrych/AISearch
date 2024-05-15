import axios from "axios";

export async function getImageByName(fileName, imageStorageUrl, res) {
    if (!fileName) {
        throw new Error("The file name is empty")
    }

    const response = await axios.get(`${imageStorageUrl}/${fileName}`, {
        responseType: 'arraybuffer'
    });

    res.setHeader('Content-Type', response.headers['content-type']);
    res.send(response.data);
}