import express from "express"
import applicationsRouter from "./api/controllers/applications/index.js"
import dotenv  from "dotenv"
import {getConfig} from "./api/lib/config/index.js";
import {initDbConnection} from "./api/database/index.js";

dotenv.config();
const config = getConfig();
console.log(config);
await initDbConnection(config);
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/applications', applicationsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});