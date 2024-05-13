import {db} from "../database/index.js";

export async function findItems(tableName, query) {
    return db(tableName).where(query).select('*')
}

export async function findOne(tableName, query) {
    return db(tableName).where(query)
        .then((result) => {
            if (result?.length) {
                return result[0];
            }
            return undefined;
        });
}


export async function createItem(tableName, model, validationSchema) {
    const { error } = validationSchema.validate(model);

    if (error) {
        throw new Error(error)
    }

    const [createdModel] = await db(tableName).insert(model).returning('*');

    return createdModel;
}