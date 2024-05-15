import {
    addApplicationSave,
    addApplicationView,
    createApplication as createApplicationInDb, deleteOneApplication,
    findAllApplications, findApplication, updateApplication, updateApplicationRating
} from "../../repositories/applications/index.js";
import {appendApplicationLabels, updateLabels} from "../labels/index.js";
import {filterLabelsByNames, findApplicationsLabels} from "../../repositories/labels/labels-repository.js";
import {createUserSave, deleteUserSave, findUserSaves} from "../../repositories/userSaves/index.js";
import {
    createApplicationRate,
    getApplicationsRates,
    getMyApplicationsRates
} from "../../repositories/applicationRates/index.js";

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

export async function registerViewService(req, res) {
    const data = await addApplicationView(req.params.applicationId)
    res.json(data);
}

export async function getService(req, res) {
    const data = await findApplicationsWithLabels(req.query)
    res.json(data);
}

export async function createService(req, res) {
    const data = await createApplication(req.body, req.attachment)

    res.json(data);
}

export async function deleteApplicationService(req, res) {
    const data = await deleteOneApplication(req.params.applicationId)

    res.json(data);
}

export async function updateService(req, res) {
    const { labels, ...applicationData } = req.body;

    const data = await updateApplication(req.params.applicationId, applicationData)
    const updatedLabels = labels?.length ? await updateLabels(req.params.applicationId, labels) : []

    res.json(getApplicationClientModel(data, updatedLabels));
}

export async function saveToLibraryService(req, res) {
    const application = await findApplication(req.params.id)

    if (!application) {
        res.status(400);
        return;
    }

    const savedApplications = await findUserSaves({ applicationId: req.params.id })

    if (savedApplications.length) {
        res.status(400).json({ error: "The application is already saved" });
        return;
    }

    await addApplicationSave(req.params.id)
    const data = await createUserSave({ savedBy: req.user.id, applicationId: req.params.id })

    res.json(data);
}

export async function removeFromLibraryService(req, res) {
    const data = await deleteUserSave(req.user.id, req.params.applicationId)

    res.json(data);
}

export async function getLibraryService(req, res) {
    const data = await findUserSaves({ savedBy: req.user.id })

    res.json(data);
}

export async function rateApplicationService(req, res) {
    await createApplicationRate({
        applicationId: req.body.applicationId,
        ratedBy: req.user.id,
        rating: req.body.rating,
        comment: req.body.comment,
    })
    const updatedApplication = await updateApplicationRating(req.body.applicationId, req.body.rating)

    res.json(updatedApplication);
}

export async function getRatingsService(req, res) {
    const applicationRates = await getApplicationsRates(req.params.applicationId)

    res.json(applicationRates);
}

export async function getMyRatingService(req, res) {
    const applicationRates = await getMyApplicationsRates(req.user.id, req.params.applicationId)

    res.json(applicationRates);
}