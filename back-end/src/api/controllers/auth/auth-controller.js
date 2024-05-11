import {createUser, getUserByEmail} from "../../../repositories/users/index.js";
import bcrypt, {genSaltSync, hashSync} from "bcrypt";
import jwt from "jsonwebtoken";

export const JWT_SECRET_KEY = 'your_secret_key';

export function getUserClientModel(user) {
    const { passwordHash, ...publicUserFields } = user;

    return {
        ...publicUserFields
    }
}

export async function register(req, res) {
    const { password, ...userData } = req.body
    const passwordHash = hashSync(password, genSaltSync(2))

    const user = await createUser({
        ...userData,
        passwordHash
    })
    const userClientModel = getUserClientModel(user);
    res.json(userClientModel);
}

export async function authenticate(req, res) {
    const user = await getUserByEmail(req.body.email);
    if (!user) {
        return res.status(200).json({error: "User not found"});
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.passwordHash);
    if (!isPasswordValid) {
        return res.status(200).json({error: "The password is invalid"});
    }

    const token =  jwt.sign({ user: getUserClientModel(user) }, JWT_SECRET_KEY, { expiresIn: '2h' });

    res.status(200).json({ token, ...getUserClientModel(user) });
}