import {createApplication as createApplicationInDb, findAllApplications} from "../../repositories/applications/index.js";
import {appendApplicationLabels} from "../labels/index.js";
import {filterLabelsByNames, findApplicationsLabels} from "../../repositories/labels/labels-repository.js";
import {createImage} from "../images/index.js";

function getApplicationClientModel(application, labels = []) {
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

    const applications = await findAllApplications({ nameFilter: filter.name, ids: applicationIdsFilter })

    if (!applications?.length) {
        return [];
    }

    const applicationsLabels = await findApplicationsLabels(applications.map((application) => application.id));

    return applications.map((application) => {
        const labels = applicationsLabels.filter((label) => label.applicationId === application.id)
        return getApplicationClientModel(application, labels)
    })
}

export async function createApplication(creationModel, imageFile = undefined) {
    const { labels, ...applicationsData } = creationModel;

    const image = imageFile ? await createImage(imageFile) : null
    const applicationModel = await createApplicationInDb({ ...applicationsData, imageId: image?.id, imageName: image?.fileName })
    const createdLabels = labels?.length ? await appendApplicationLabels(applicationModel.id, labels) : []

    return getApplicationClientModel(applicationModel, createdLabels)
}