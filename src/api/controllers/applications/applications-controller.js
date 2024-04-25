import { db } from "../../database/index.js";
import {tableNames} from "../../database/index.js";

export async function get(req, res) {
    const data = await db.select("*").from(tableNames.applications)

    res.json(data);
}

export async function create(req, res) {
    const data = await db.select("*").from(tableNames.applications)

    res.json(data);
}