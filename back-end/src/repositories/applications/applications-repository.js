import {db, tableNames} from "../../database/index.js";
import {applicationCreateSchema} from "./validation.js";

function applicationsTable() {
    return db(tableNames.applications);
}

export async function findAllApplications() {
    return await applicationsTable().select('*');
}

export async function findApplication(id) {
    const [createdModel] = await applicationsTable().where({ id });

    return createdModel;
}

export async function createApplication(model) {
    const { error } = applicationCreateSchema.validate(model);

    if (error) {
        throw new Error('Invalid model given ')
    }

    const [createdModel] = await applicationsTable().insert(model).returning('*');

    return createdModel;
}