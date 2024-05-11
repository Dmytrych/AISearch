import {db, tableNames} from "../../database/index.js";
import {applicationCommentCreateSchema} from "./validation.js";

export async function createApplicationComment(creationModel) {
    const { error } = applicationCommentCreateSchema.validate(creationModel);

    if (error) {
        throw new Error('Invalid model given ')
    }

    return await db(tableNames.applicationComments).insert(creationModel).returning('*').first();
}