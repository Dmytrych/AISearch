import {db, tableNames} from "../../database/index.js";
import {applicationRateCreateSchema} from "./validation.js";
import {createItem, findItems, findOne} from "../common.js";

export async function createApplicationRate(creationModel) {
    return createItem(tableNames.applicationRates, creationModel, applicationRateCreateSchema)
}

export async function getApplicationsRate(ratedBy, applicationId) {
    return findOne(tableNames.applicationRates, { ratedBy, applicationId })
}

export async function getApplicationsRates(applicationId) {
    return db(tableNames.applicationRates).where({ applicationId }).join(tableNames.users, `${tableNames.users}.id`, '=', `${tableNames.applicationRates}.ratedBy`).select(`${tableNames.applicationRates}.*`, `${tableNames.users}.nickname`)
}

export async function getMyApplicationsRates(ratedBy, applicationId) {
    return findOne(tableNames.applicationRates, (query) => query.where({ applicationId, ratedBy }))
}


