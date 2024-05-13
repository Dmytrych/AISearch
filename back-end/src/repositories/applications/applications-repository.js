import {db, tableNames} from "../../database/index.js";
import {applicationCreateSchema} from "./validation.js";
import {findAndDelete, findItems} from "../common.js";
import {deleteApplicationLabels} from "../labels/labels-repository.js";

function applicationsTable() {
    return db(tableNames.applications);
}

export async function filterByName(substring) {
    return applicationsTable()
        .where('name', 'ilike', `%${substring}%`)
        .orWhere('subtitle', 'ilike', `%${substring}%`)
        .orWhere('description', 'ilike', `%${substring}%`);
}

export async function findAllApplications(filtering) {
    return findItems(tableNames.applications, filtering)
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

    const result = await applicationsTable().where({ id: applicationId }).update({
        rating: newRating,
        ratedCount: newRatedCount
    }).returning('*')

    if (result?.length) {
        return result[0]
    }

    return undefined;
}

export async function addApplicationView(applicationId) {
    const result = await applicationsTable().where({ id: applicationId }).increment('views', 1)

    if (result?.length) {
        return result[0]
    }

    return undefined;
}

export async function addApplicationSave(applicationId) {
    const result = await applicationsTable().where({ id: applicationId }).increment('saves', 1)

    if (result?.length) {
        return result[0]
    }

    return undefined;
}

export async function updateApplication(applicationId, newFields) {
    const [found] = await applicationsTable().where({ id: applicationId });

    if (!found) {
        return undefined;
    }

    const result = await applicationsTable().where({ id: applicationId }).update(newFields).returning('*')

    if (result?.length) {
        return result[0]
    }

    return undefined;
}

export async function deleteOneApplication(applicationId) {
    const deletionResult = await findAndDelete(tableNames.applications, { id: applicationId })
    await deleteApplicationLabels(applicationId)

    return deletionResult;
}