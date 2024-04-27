import {createApplication as createApplicationInDb, findAllApplications} from "../../repositories/applications/index.js";
import {appendApplicationLabels} from "../labels/index.js";

export async function findApplications() {
    return await findAllApplications()
}

export async function createApplication(creationModel) {
    const { labels, ...applicationsData } = creationModel;

    const applicationModel = await createApplicationInDb(applicationsData)
    const createdLabels = labels?.length ? await appendApplicationLabels(applicationModel.id, labels) : []

    return {
        ...applicationModel,
        labels: createdLabels.map((label) => label.name)
    }
}