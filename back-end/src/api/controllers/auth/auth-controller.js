import {
    authenticateService,
    getProfileService,
    registerService,
    updateProfileService
} from "../../../lib/auth/index.js";

export const JWT_SECRET_KEY = 'your_secret_key';

export async function register(req, res) {
    return await registerService(req, res)
}

export async function getProfile(req, res) {
    return await getProfileService(req, res)
}

export async function updateProfile(req, res) {
    return await updateProfileService(req, res)
}

export async function authenticate(req, res) {
    return await authenticateService(req, res)
}