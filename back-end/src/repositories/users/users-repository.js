import {db, tableNames} from "../../database/index.js";
import {userCreateSchema, userUpdateSchema} from "./validation.js";
import {findOne} from "../common.js";

export async function getUser(id) {
    return db(tableNames.users).where({ id }).select('*').first();
}

export async function getUserByEmail(email) {
    return findOne(tableNames.users, { email });
}

export async function createUser(userModel) {
    const { error } = userCreateSchema.validate(userModel);

    if (error) {
        throw new Error(error.message);
    }

    const [createdUser] = await db(tableNames.users).insert({ isAdmin: false, ...userModel }).returning('*');
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