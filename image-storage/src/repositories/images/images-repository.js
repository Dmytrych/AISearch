import {db, tableNames} from "../../database/index.js";
import {imageCreateSchema} from "./validation.js";

export async function create(model) {
    const { error } = imageCreateSchema.validate(model);

    if (error) {
        throw new Error('Invalid model given')
    }

    return (await db(tableNames.images).insert(model).returning('*'))[0];
}

export async function getByName(fileName) {
    return (await db(tableNames.images).where({ fileName }).returning('*'))[0];
}