import axios from "axios";
import FormData from "form-data";
import bufferToStream from "buffer-to-stream"

export function getAttachmentMiddleware(imageStorageUrl) {
    return async function handleFileAttachment(req, res, next) {
        if (!req.file) {
            next();
            return;
        }

        // Prepare the file to be sent to another server
        const form = new FormData();
        form.append('image', bufferToStream(req.file.buffer), {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });

        const responseFile = await axios.post(imageStorageUrl, form, {
            headers: {
                ...form.getHeaders()
            }
        });
        req.attachment = responseFile.data
        next();
    }
}