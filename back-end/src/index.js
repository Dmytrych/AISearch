import express from "express"
import {getApplicationsRouter} from "./api/controllers/applications/index.js"
import dotenv  from "dotenv"
import {getConfig} from "./lib/config/index.js";
import {initDbConnection} from "./database/index.js";

dotenv.config();
const config = getConfig();
await initDbConnection(config);
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/applications', getApplicationsRouter());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});