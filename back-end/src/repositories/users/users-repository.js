import {db, tableNames} from "../../database/index.js";
import {userCreateSchema, userUpdateSchema} from "./validation.js";

export async function getUser(id) {
    return db(tableNames.users).where({ id }).select('*').first();
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

export async function updateUser(userId, userModel) {
    const { error } = userUpdateSchema.validate(userModel);

    if (error) {
        throw new Error(error.message);
    }

    const [updatedUser] = await db(tableNames.users).where({id: userId}).update(userModel).returning('*');

    return updatedUser;
}