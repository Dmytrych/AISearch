import {labelCreateSchema} from "./validation.js";
import {db, tableNames} from "../../database/index.js";
import Joi from "joi";

function labelsTable() {
    return db(tableNames.labels);
}

export async function createLabel(model) {
    const { error } = labelCreateSchema.validate(model);

    if (error) {
        throw new Error('Invalid model given')
    }

    const [createdModel] = await labelsTable().insert(model).returning('*');

    return createdModel;
}

export async function createLabels(model) {
    const { error } = Joi.array().items(labelCreateSchema).validate(model);

    if (error) {
        throw new Error('Invalid model given')
    }

    return labelsTable().insert(model).returning('*');
}

export async function deleteLabels(applicationId, labelNames) {
    return labelsTable().whereIn('name', labelNames).andWhere('applicationId', applicationId).del()
}

export async function findApplicationLabels(applicationId) {
    return labelsTable().where({ applicationId });
}