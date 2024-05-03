import {authenticate as authenticateUser, register as registerUser} from "../../../lib/auth/auth-service.js";

export async function register(req, res) {
    const data = await registerUser(req.body)
    res.json(data);
}

export async function authenticate(req, res) {
    const data = await authenticateUser(req.body)
    res.json(data);
}
