import express from "express"
import {getApplicationsRouter} from "./api/controllers/applications/index.js"
import dotenv  from "dotenv"
import cors from "cors"
import {getConfig} from "./lib/config/index.js";
import {initDbConnection} from "./database/index.js";
import morgan from "morgan";

dotenv.config();
const config = getConfig();
await initDbConnection(config);
const app = express();
const PORT = config.PORT ?? 4000;

app.use(express.json());
app.use(cors())

app.use('/applications', getApplicationsRouter());

morgan.token('body', (req) => {
    return JSON.stringify(req.body || '');
});
morgan.token('errorMessage', function (req, res) {
    return res?.errorMessage || '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - Body: :body'));

app.use(clientErrorHandler);

function clientErrorHandler (err, req, res, next) {
    res.status(500).send({ error: 'Internal server error' })
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});