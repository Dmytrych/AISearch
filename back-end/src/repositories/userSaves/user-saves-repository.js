import {db, tableNames} from "../../database/index.js";
import {userSaveCreateSchema} from "./validation.js";

export async function createUserSave(creationModel) {
    const { error } = userSaveCreateSchema.validate(creationModel);

    if (error) {
        throw new Error('Invalid model given ')
    }

    const [createdModel] = await db(tableNames.userSaves).insert(creationModel).returning('*');
    return createdModel;
}

export async function findUserSaves(filter) {
    return db(tableNames.userSaves)
        .select(`${tableNames.applications}.*`)
        .where(filter)
        .join(tableNames.applications, `${tableNames.applications}.id`, '=', `${tableNames.userSaves}.applicationId`);
}