import {InversifyExpressServer} from "inversify-express-utils";
import mainContainer from "./dependency-injection";
import * as bodyParser from 'body-parser';

const server = new InversifyExpressServer(mainContainer)
server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

server.setConfig((app) => {
  let logger = morgan('combined')
  app.use(logger);
});

server.setErrorConfig((app) => {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
});

let app = server.build();
app.listen(3000);