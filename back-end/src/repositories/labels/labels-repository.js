import {labelCreateSchema} from "./validation.js";
import {db, tableNames} from "../../database/index.js";
import Joi from "joi";
import {findAndDelete} from "../common.js";

function labelsTable() {
    return db(tableNames.labels);
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

export async function deleteApplicationLabels(applicationId) {
    return findAndDelete(tableNames.labels, { applicationId })
}

export async function findApplicationLabels(applicationId) {
    return labelsTable().where({ applicationId });
}

export async function findApplicationsLabels(applicationIds) {
    return labelsTable().whereIn('applicationId', applicationIds);
}

export async function filterLabelsByNames(names) {
    return labelsTable().whereIn('name', names);
}

export async function filterLabelsByName(name) {
    return labelsTable().whereLike('name', `%${name}%`);
}