import {db, tableNames} from "../../database/index.js";
import {userCreateSchema} from "./validation.js";

export async function getUser(id) {
    const usersResult = await db(tableNames.users).where({ id }).select('*').first();
    return usersResult[0];
}

export async function getUserByEmail(email) {
    return db(tableNames.users).where({ email }).first();
}

export async function createUser(userModel) {
    const { error } = userCreateSchema.validate(userModel);

    if (error) {
        throw new Error(error.message);
    }

    const [createdUser] = await db(tableNames.users).insert({ ...userModel, isAdmin: false }).returning('*');
    return createdUser;
}