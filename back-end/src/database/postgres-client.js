import initKnex from "knex"
import knexConfig from "../../knexfile.cjs"
import {findAllApplications} from "../repositories/applications/index.js";
import {seedAllData} from "./initialSeeding/init-all.js";

export let db;

export async function initDbConnection(config) {
    if (db) {
        throw new Error("Error trying to reinitialize the db context")
    }

    try {
        db = initKnex(knexConfig[config.NODE_ENV])

        const allApplications = await findAllApplications({});
        if (!allApplications?.length) {
          await delay(10000);
          await seedAllData();
        }
    } catch (e) {
        console.error("Database creation failed", e);
        throw e;
    }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
