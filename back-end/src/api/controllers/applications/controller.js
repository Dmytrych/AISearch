import {createApplication, findApplicationsWithLabels} from "../../../lib/applications/index.js";
import {createUserSave, findUserSaves} from "../../../repositories/userSaves/index.js";
import {findApplication, updateApplicationRating} from "../../../repositories/applications/index.js";
import {
    createApplicationRate,
    getApplicationsRate,
    getApplicationsRates, getMyApplicationsRates
} from "../../../repositories/applicationRates/index.js";

export async function get(req, res) {
    const data = await findApplicationsWithLabels(req.query)
    res.json(data);
}

export async function create(req, res) {
    const data = await createApplication(req.body, req.file)

    res.json(data);
}

export async function saveToLibrary(req, res) {
    if (!req.params.id) {
        res.status("400");
    }

    const application = await findApplication(req.params.id)

    if (!application) {
        res.status("400");
    }

    const data = await createUserSave({ savedBy: req.user.id, applicationId: req.params.id })

    res.json(data);
}

export async function getLibrary(req, res) {
    const data = await findUserSaves({ savedBy: req.user.id })

    res.json(data);
}

export async function rateApplication(req, res) {
    await createApplicationRate({
        applicationId: req.body.applicationId,
        ratedBy: req.user.id,
        rating: req.body.rating,
        comment: req.body.comment,
    })
    const updatedApplication = await updateApplicationRating(req.body.applicationId, req.body.rating)

    res.json(updatedApplication);
}

export async function getRatings(req, res) {
    const applicationRates = await getApplicationsRates(req.params.applicationId)

    res.json(applicationRates);
}

export async function getMyRating(req, res) {
    const applicationRates = await getMyApplicationsRates(req.user.id, req.params.applicationId)

    res.json(applicationRates);
}