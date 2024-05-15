import {
    createService,
    deleteApplicationService, getLibraryService, getMyRatingService, getRatingsService,
    getService, rateApplicationService,
    registerViewService,
    removeFromLibraryService,
    saveToLibraryService,
    updateService
} from "../../../lib/applications/index.js";

export async function registerView(req, res) {
    return await registerViewService(req, res)
}

export async function get(req, res) {
    return await getService(req, res)
}

export async function create(req, res) {
    return await createService(req, res)
}

export async function deleteApplication(req, res) {
    return await deleteApplicationService(req, res)
}

export async function update(req, res) {
    return await updateService(req, res)
}

export async function saveToLibrary(req, res) {
    return await saveToLibraryService(req, res)
}

export async function removeFromLibrary(req, res) {
    return await removeFromLibraryService(req, res)
}

export async function getLibrary(req, res) {
    return await getLibraryService(req, res)
}

export async function rateApplication(req, res) {
    return await rateApplicationService(req, res)
}

export async function getRatings(req, res) {
    return await getRatingsService(req, res)
}

export async function getMyRating(req, res) {
    return await getMyRatingService(req, res)
}