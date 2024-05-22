import {createUser, getUser, getUserByEmail, updateUser} from "../../repositories/users/index.js";
import bcrypt, {genSaltSync, hashSync} from "bcrypt";
import jwt from "jsonwebtoken";
import {JWT_SECRET_KEY} from "../../api/controllers/auth/auth-controller.js";

export function getUserClientModel(user) {
    const { passwordHash, ...publicUserFields } = user;

    return {
        ...publicUserFields
    }
}

export async function registerService(req, res) {
    const existingUser = await getUserByEmail(req.body.email)

    if (existingUser) {
        res.json({ error: "User with such email already exists" });
        return;
    }

    const { password, ...userData } = req.body
    const passwordHash = hashSync(password, genSaltSync(2))

    const user = await createUser({
        ...userData,
        passwordHash
    })

    const userClientModel = getUserClientModel(user);
    res.json(userClientModel);
}

export async function getProfileService(req, res) {
    const user = await getUser(req.user.id);
    const userClientModel = getUserClientModel(user);
    res.json(userClientModel);
}

export async function updateProfileService(req, res) {
    const user = await updateUser(req.user.id, req.body);
    const userClientModel = getUserClientModel(user);
    res.json(userClientModel);
}

export async function authenticateService(req, res) {
    const user = await getUserByEmail(req.body.email);
    if (!user) {
        res.status(200).json({error: "User not found"})
        return;
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.passwordHash);
    if (!isPasswordValid) {
        res.status(200).json({error: "The password is invalid"});
        return;
    }

    const token = jwt.sign({ ...getUserClientModel(user) }, JWT_SECRET_KEY, { expiresIn: '2h' });

    res.status(200).json({ token, ...getUserClientModel(user) });
}