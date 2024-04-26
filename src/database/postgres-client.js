import createKnex from "knex"
import {tableNames} from "./table-names.js";

export let db;

export async function initDbConnection(config) {
    if (db) {
        throw new Error("Error trying to reinitialize the db context")
    }

    const knex = createKnex({
        client: 'pg',
        connection: {
            user: config.PG_USER,
            host: config.PG_HOST,
            database: config.PG_DATABASE_NAME,
            password: config.PG_PASSWORD,
            port: config.PG_PORT,
        }
    })

    try {
        const schema = knex.schema

        if (!await schema.hasTable(tableNames.applications)) {
            await schema.createTable(tableNames.applications, (table) => {
                table.increments('id');
                table.string('name').notNullable();
                table.string('url').notNullable();
                table.text('description');
                table.timestamps(true, true, true);
                table.integer('rating').defaultTo(0);
            });
        }

        db = knex
    } catch (e) {
        console.error("Database schema creation failed", e);
        throw e;
    }
}