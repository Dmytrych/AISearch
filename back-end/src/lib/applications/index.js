import {createApplication as createApplicationInDb, findAllApplications} from "../../repositories/applications/index.js";
import {appendApplicationLabels} from "../labels/index.js";
import {filterLabelsByNames, findApplicationsLabels} from "../../repositories/labels/labels-repository.js";

export async function findApplicationsWithLabels(filter = {}) {
    let applicationIdsFilter;

    if (filter.labels?.length) {
        const foundLabels = await filterLabelsByNames(filter.labels)
        applicationIdsFilter = foundLabels.map((label) => label.applicationId)

        if (!applicationIdsFilter?.length) {
            return []
        }
    }

    const applications = await findAllApplications({ nameFilter: filter.name, ids: applicationIdsFilter })

    if (!applications?.length) {
        return [];
    }

    const applicationsLabels = await findApplicationsLabels(applications.map((application) => application.id));

    return applications.map((application) => {
        const applicationLabelNames = applicationsLabels.filter((label) => label.applicationId === application.id).map((label) => label.name)

        return {
            ...application,
            labels: applicationLabelNames
        }
    })
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