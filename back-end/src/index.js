import express from "express"
import {getApplicationsRouter} from "./api/controllers/applications/index.js"
import dotenv  from "dotenv"
import cors from "cors"
import {getConfig} from "./lib/config/index.js";
import {initDbConnection} from "./database/index.js";
import morgan from "morgan";
import {initLogger} from "./lib/logging/index.js";
import {getImagesRouter} from "./api/controllers/images/index.js";
import {getAuthRouter} from "./api/controllers/auth/index.js";

dotenv.config();
const config = getConfig();
await initDbConnection(config);
const app = express();
const logger = initLogger();

const PORT = config.PORT ?? 4000;

app.use(express.json());
app.use(cors())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - Body: :body'));

app.use('/applications', getApplicationsRouter());
app.use('/images', getImagesRouter())
app.use('/auth', getAuthRouter(config))

morgan.token('body', (req) => {
    return JSON.stringify(req.body || '');
});

morgan.token('errorMessage', function (req, res) {
    return res?.errorMessage || '';
});

app.use(clientErrorHandler);

function clientErrorHandler (err, req, res, next) {
    logger.error(err);
    res.status(500).send({ error: 'Internal server error' })
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});