import {
    addApplicationSave,
    addApplicationView,
    createApplication as createApplicationInDb, deleteOneApplication,
    findAllApplications, findApplication, updateApplication, updateApplicationRating
} from "../../repositories/applications/index.js";
import {appendApplicationLabels, updateLabels} from "../labels/index.js";
import {filterLabelsByNames, findApplicationsLabels} from "../../repositories/labels/labels-repository.js";
import {createUserSave, deleteUserSave, findUserSaves} from "../../repositories/userSaves/index.js";
import {
    createApplicationRate,
    getApplicationsRates,
    getMyApplicationsRates
} from "../../repositories/applicationRates/index.js";
import axios from "axios";

export function getApplicationClientModel(application, labels = []) {
    return {
        ...application,
        labels: labels?.map((label) => label.name)
    }
}

export async function findApplicationsWithLabels(filter = {}) {
    let applicationIdsFilter;

    if (filter.labels?.length) {
        const foundLabels = await filterLabelsByNames(filter.labels)
        applicationIdsFilter = foundLabels.map((label) => label.applicationId)

        if (!applicationIdsFilter?.length) {
            return []
        }
    }

    if (filter.name?.length) {
      const data = await findByName(filter.name)
      const applicationIds = data.map((document) => document.externalId)
      applicationIdsFilter = applicationIdsFilter ? [...applicationIdsFilter, applicationIds] : applicationIds
    }

    const applications = await findAllApplications((query) => {
        let executedQuery = query
        if (applicationIdsFilter) {
            executedQuery = query.whereIn('id', applicationIdsFilter)
        }
        return executedQuery
    })

    if (!applications?.length) {
        return [];
    }

    const applicationsLabels = await findApplicationsLabels(applications.map((application) => application.id));

    return applications.map((application) => {
        const labels = applicationsLabels.filter((label) => label.applicationId === application.id)
        return getApplicationClientModel(application, labels)
    })
}

export async function createApplication(creationModel, attachment = undefined) {
    const { labels, ...applicationsData } = creationModel;

    const applicationModel = await createApplicationInDb({ ...applicationsData, imageId: attachment?.id, imageName: attachment?.fileName })
    const createdLabels = labels?.length ? await appendApplicationLabels(applicationModel.id, labels) : []

    return getApplicationClientModel(applicationModel, createdLabels)
}

export async function registerViewService(req, res) {
    const data = await addApplicationView(req.params.applicationId)
    res.json(data);
}

export async function getService(req, res) {
    const data = await findApplicationsWithLabels(req.query)
    res.json(data);
}

export async function getServiceById(req, res) {
    const application = await findApplication(req.params.applicationId)

    if (!application) {
        res.json({ error: "The application not found" })
        return;
    }

  const applicationsLabels = await getServiceLabels(application);

  res.json(getApplicationClientModel(application, applicationsLabels));
}

async function getServiceLabels(application) {
  return await findApplicationsLabels([application.id])
}

export async function createService(req, res) {
    const { labels, ...formData } = req.body;
    const parsedLabels = labels ? JSON.parse(labels) : []
    const data = await createApplication({...formData, labels: parsedLabels}, req.attachment)

    if (data && data.id) {
      try {
        await analyze(`${data.name} ${data.subtitle} ${data.description}`, data.id)
      } catch (e) {
        await deleteOneApplication(data.id)
        throw new Error("Analization failed")
      }
      res.json(getApplicationClientModel(data, await getServiceLabels(data)))
      return;
    }

    res.json({error: "Could not create an application"});
}

export async function deleteApplicationService(req, res) {
    const data = await deleteOneApplication(req.params.applicationId)

    res.json(data);
}

export async function updateService(req, res) {
    const { labels, ...applicationData } = req.body;

    const updatedModel = req.attachment ? {
        ...applicationData,
        imageId: req.attachment.id,
        imageName: req.attachment.fileName
    } : applicationData

    const data = await updateApplication(req.params.applicationId, updatedModel)
    const updatedLabels = labels?.length ? await updateLabels(req.params.applicationId, labels) : []

    res.json(getApplicationClientModel(data, updatedLabels));
}

export async function saveToLibraryService(req, res) {
    const application = await findApplication(req.params.id)

    if (!application) {
        res.status(400).json({ error: "The application was not found" });
        return;
    }

    const savedApplications = await findUserSaves({ applicationId: req.params.id })

    if (savedApplications.length) {
        res.status(400).json({ error: "The application is already saved" });
        return;
    }

    await addApplicationSave(req.params.id)
    const data = await createUserSave({ savedBy: req.user.id, applicationId: req.params.id })

    res.json(data);
}

export async function removeFromLibraryService(req, res) {
    const data = await deleteUserSave(req.user.id, req.params.applicationId)

    res.json(data);
}

export async function getLibraryService(req, res) {
    const data = await findUserSaves({ savedBy: req.user.id })

    res.json(data);
}

export async function rateApplicationService(req, res) {
    const rate = await createApplicationRate({
        applicationId: req.body.applicationId,
        ratedBy: req.user.id,
        rating: req.body.rating,
        comment: req.body.comment,
    })
    await updateApplicationRating(req.body.applicationId, req.body.rating)

    res.json({ ...rate, username: req.user.nickname });
}

export async function getRatingsService(req, res) {
    const applicationRates = await getApplicationsRates(req.params.applicationId)

    res.json(applicationRates);
}

export async function getMyRatingService(req, res) {
    const applicationRate = await getMyApplicationsRates(req.user.id, req.params.applicationId)

    if (!applicationRate) {
        res.status(200);
        return;
    }

    res.json({ ...applicationRate, username: req.user.nickname });
}

export async function analyze(content, applicationId) {
  const response = await axios.post(`${process.env.KEYWORD_ANALYZER_URL}/store`, {
    content,
    applicationId
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response || response.status !== 200) {
    throw new Error("Failed to create");
  }
}

export async function findByName(query) {
  const response = await axios.post(`${process.env.KEYWORD_ANALYZER_URL}/search`, {
    query
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response || response.status !== 200) {
    console.log("Error happened");
    return [];
  }

  console.log(`Data: ${JSON.stringify(response.data)}`)

  return response.data
}