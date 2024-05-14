import {createApplication as createApplicationInDb, findAllApplications} from "../../repositories/applications/index.js";
import {appendApplicationLabels} from "../labels/index.js";
import {filterLabelsByNames, findApplicationsLabels} from "../../repositories/labels/labels-repository.js";
import {createImage} from "../images/index.js";

export function getApplicationClientModel(application, labels = []) {
    return {
        ...application,
        labels: labels?.map((label) => label.name)
    }
}

export async function findApplicationsWithLabels(filter = {}) {
    let applicationIdsFilter;

    if (filter.labels?.length) {
        const foundLabels = await filterLabelsByNames(filter.labels)
        applicationIdsFilter = foundLabels.map((label) => label.applicationId)

        if (!applicationIdsFilter?.length) {
            return []
        }
    }

    const nameFilter = !filter.name ? undefined : (query) => query
        .where('name', 'ilike', `%${filter.name}%`)
        .orWhere('subtitle', 'ilike', `%${filter.name}%`)
        .orWhere('description', 'ilike', `%${filter.name}%`)
    const applications = await findAllApplications((query) => {
        let executedQuery = query
        if (applicationIdsFilter) {
            executedQuery = query.whereIn('id', applicationIdsFilter)
        }
        if (nameFilter) {
            executedQuery = query.orWhere(nameFilter)
        }
        return query
    })

    if (!applications?.length) {
        return [];
    }

    const applicationsLabels = await findApplicationsLabels(applications.map((application) => application.id));

    return applications.map((application) => {
        const labels = applicationsLabels.filter((label) => label.applicationId === application.id)
        return getApplicationClientModel(application, labels)
    })
}

export async function createApplication(creationModel, attachment = undefined) {
    const { labels, ...applicationsData } = creationModel;

    const applicationModel = await createApplicationInDb({ ...applicationsData, imageId: attachment?.id, imageName: attachment?.fileName })
    const createdLabels = labels?.length ? await appendApplicationLabels(applicationModel.id, labels) : []

    return getApplicationClientModel(applicationModel, createdLabels)
}