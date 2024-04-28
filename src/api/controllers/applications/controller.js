import {createApplication, findApplicationsWithLabels} from "../../../lib/applications/index.js";

export async function get(req, res) {
    const data = await findApplicationsWithLabels()

    res.json(data);
}

export async function create(req, res) {
    const data = await createApplication(req.body)

    res.json(data);
}
