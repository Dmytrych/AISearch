import {
    createApplication,
    findAllApplications
} from "../../../repositories/applications/applications-repository.js";

export async function get(req, res) {
    const data = await findAllApplications()

    res.json(data);
}

export async function create(req, res) {
    const data = await createApplication(req.body)

    res.json(data);
}