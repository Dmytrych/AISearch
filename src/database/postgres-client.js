import initKnex from "knex"
import knexConfig from "../../knexfile.cjs"

export let db;

export async function initDbConnection(config) {
    if (db) {
        throw new Error("Error trying to reinitialize the db context")
    }

    try {
        db = initKnex(knexConfig[config.NODE_ENV])
    } catch (e) {
        console.error("Database creation failed", e);
        throw e;
    }
}