import {tableNames} from "../../database/index.js";
import {applicationRateCreateSchema} from "./validation.js";
import {createItem, findItems, findOne} from "../common.js";

export async function createApplicationRate(creationModel) {
    return createItem(tableNames.applicationRates, creationModel, applicationRateCreateSchema)
}

export async function getApplicationsRate(ratedBy, applicationId) {
    return findOne(tableNames.applicationRates, { ratedBy, applicationId })
}

export async function getApplicationsRates(applicationId) {
    return findItems(tableNames.applicationRates, (query) => query.where({ applicationId }))
}

export async function getMyApplicationsRates(ratedBy, applicationId) {
    return findItems(tableNames.applicationRates, (query) => query.where({ applicationId, ratedBy }))
}


