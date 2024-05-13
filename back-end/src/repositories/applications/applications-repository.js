import {db, tableNames} from "../../database/index.js";
import {applicationCreateSchema} from "./validation.js";

function applicationsTable() {
    return db(tableNames.applications);
}

export async function findAllApplications({ ids, nameFilter }) {
    let query = applicationsTable();
    if (ids?.length) {
        query = query.whereIn('id', ids);
    }
    if (nameFilter) {
        console.log(nameFilter);
        query = query.andWhereLike('name', `%${nameFilter}%`);
    }
    return query.select('*')
}

export async function findApplication(id) {
    const [createdModel] = await applicationsTable().where({ id });

    return createdModel;
}

export async function createApplication(model) {
    const { error } = applicationCreateSchema.validate(model);

    if (error) {
        throw new Error('Invalid model given ')
    }

    const [createdModel] = await applicationsTable().insert(model).returning('*');

    return createdModel;
}

export async function updateApplicationRating(applicationId, rating) {
    const [found] = await applicationsTable().where({ id: applicationId });

    if (!found) {
        return undefined;
    }

    const newRatedCount = found.ratedCount + 1;
    const newRating = found?.rating === 0 ? rating : (found.rating * found.ratedCount + rating) / newRatedCount

    const result = await applicationsTable().update({
        rating: newRating,
        ratedCount: newRatedCount
    }).returning('*')

    if (result?.length) {
        return result[0]
    }

    return undefined;
}