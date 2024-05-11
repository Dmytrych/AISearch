import {db, tableNames} from "../../database/index.js";
import {applicationRateCreateSchema} from "./validation.js";

export async function createApplicationRate(creationModel) {
    const { error } = applicationRateCreateSchema.validate(creationModel);

    if (error) {
        throw new Error('Invalid model given ')
    }

    return await db(tableNames.applicationRates).insert(creationModel).returning('*').first();
}