import * as fs from "fs";
import {createUser} from "../../repositories/users/index.js";
import bcrypt, {genSaltSync, hashSync} from "bcrypt";
import {createApplication} from "../../repositories/applications/index.js";
import {createLabels} from "../../repositories/labels/labels-repository.js";
import {createApplicationRate} from "../../repositories/applicationRates/index.js";
import * as path from "path";
import {create} from "../../repositories/images/index.js";
import crypto from "crypto";
import {analyze} from "../../lib/applications/index.js";

export async function seedAllData() {
  const file = fs.readFileSync("./src/database/initialSeeding/data.json", 'utf8');

  const data = JSON.parse(file);

  const allUsers = data.users;
// const images = data.applications.map((application) => ({ id: application.imageId, name: application.imageName }))
  const files = readFilesFromFolderSync("./src/database/initialSeeding/images")
  const images = await createImages(files)

  const applicationModels = data.applications.map((application) => {
    console.log(JSON.stringify(application))

    const image = images.find((mapImage) => mapImage.originalFileName === application.imageName)
    console.log(application.fileName)
    return {
      id:  application.id,
      name: application.name,
      url: application.url,
      subtitle: application.subtitle,
      description: application.description,
      imageId:  image.id,
      imageName: image.fileName,
      rating: application.rating,
      views: application.views,
      saves: application.saves,
      ratedCount: application.ratedCount,
    }
  })

  await createUsers(allUsers)
  const application = await createApplicationModels(applicationModels)
  await analyzeall(application)
  await createAppLabels(data.applications)
  await createComments(data.applications)
}

async function createApplicationModels(models) {
  const apps = []
  models.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  for (const app of models) {
    const {id, ...otherStuff} = app
    const created = await createApplication(otherStuff)
    apps.push(created);
    console.log(`Seeded APPLICATION ${id} with id: ${created.id}`)
  }
  console.log("All applications seeded")
  return apps;
}

async function createAppLabels(models) {
  const finLabels = models.flatMap((app) => {
    return app.labels.map((label) => ({
      applicationId: app.id,
      name: label
    }))
  })

  await createLabels(finLabels);

  console.log(`Created LABELS: ${finLabels.length}`)
}

async function createComments(models) {
  const rates = models.flatMap((app) => {
    return app.comments.map((comment) => ({
      applicationId: app.id,
      ratedBy: comment.userId,
      rating: comment.rated,
      comment: comment.comment
    }))
  })

  for (const rate of rates) {
    await createApplicationRate(rate)
  }

  console.log(`Created RATES: ${rates.length}`)
}

async function createImages(images) {
  const createdImages = []
  for (let image of images) {
    const imageFin = await create(image)
    createdImages.push(imageFin)
  }
  return createdImages;
}

async function createUsers(allUsers) {
  async function registerUser(userData) {
    const { password, id, ...userFields } = userData
    const passwordHash = hashSync("test", genSaltSync(2))

    const user = await createUser({
      ...userFields,
      passwordHash
    })

    console.log(`Seeded USER ${id} with id: ${user.id}`)
  }

  console.log(JSON.stringify(allUsers));
  allUsers.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  for (let user of allUsers) {
    await registerUser(user)
  }
  console.log("All users seeded")
}

function readFilesFromFolderSync(folderPath) {
  const files = [];
  try {
    const filenames = fs.readdirSync(folderPath);
    filenames.forEach((filename) => {
      const filePath = path.join(folderPath, filename);
      const content = fs.readFileSync(filePath);
      const ext = path.extname(filename).toLowerCase();
      files.push({
        fileName: `${crypto.randomUUID()}.png`, // Replace with your logic to generate GUID
        originalFileName: filename,
        extension: ext,
        content: content,
        mimeType: "image/png",
      });
    });
  } catch (error) {
    console.error('Error reading files:', error);
  }
  return files;
}

async function analyzeall(services) {
  for (const service of services) {
    await analyze(`${service.name} ${service.subtitle} ${service.description}`, service.id)
    console.log(`Analyze success for ${service.id}`)
  }
}

