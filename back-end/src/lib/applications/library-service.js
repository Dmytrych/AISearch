import {addApplicationSave, findApplication, updateApplicationRating} from "../../repositories/applications/index.js";
import {createUserSave, deleteUserSave, findUserSaves} from "../../repositories/userSaves/index.js";
import {
    createApplicationRate,
    getApplicationsRates,
    getMyApplicationsRates
} from "../../repositories/applicationRates/index.js";

export async function saveToLibraryService(req, res) {
    const application = await findApplication(req.params.id)

    if (!application) {
        res.status(400).json({ error: "The application was not found" });
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
    const rate = await createApplicationRate({
        applicationId: req.body.applicationId,
        ratedBy: req.user.id,
        rating: req.body.rating,
        comment: req.body.comment,
    })
    await updateApplicationRating(req.body.applicationId, req.body.rating)

    res.json({ ...rate, username: req.user.nickname });
}

export async function getRatingsService(req, res) {
    const applicationRates = await getApplicationsRates(req.params.applicationId)

    res.json(applicationRates);
}

export async function getMyRatingService(req, res) {
    const applicationRate = await getMyApplicationsRates(req.user.id, req.params.applicationId)

    if (!applicationRate) {
        res.status(200);
        return;
    }

    res.json({ ...applicationRate, username: req.user.nickname });
}