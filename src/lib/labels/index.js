import {createLabels, deleteLabels, findApplicationLabels} from "../../repositories/labels/labels-repository.js";

/**
 * Calculates the area of a circle based on its radius.
 *
 * @param {number} applicationId Application which owns the labels.
 * @param {Array<string>} labelNames Label names.
 * @returns {Object} Array of created label models.
 */
export async function updateLabels(applicationId, labelNames) {
    const existingLabels = await findApplicationLabels(applicationId)

    const labelNamesToDelete = existingLabels.filter((label) => !labelNames.includes(label.name)).map((label) => label.name);
    const labelNamesToKeep = existingLabels.filter((label) => !labelNamesToDelete.includes(label.name)).map((label) => label.name);

    await deleteLabels(applicationId, labelNamesToDelete);

    const newLabelNames = labelNames.filter((label) => !labelNamesToKeep.includes(label));
    await appendApplicationLabels(applicationId, newLabelNames);

    return await findApplicationLabels(applicationId);
}

export async function appendApplicationLabels(applicationId, labelNames) {
    const labelModels = labelNames.map((labelName) => ({
        applicationId,
        name: labelName
    }))

    return createLabels(labelModels);
}