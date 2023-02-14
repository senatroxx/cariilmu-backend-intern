import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

import dotenv from "dotenv";
import logger from "./utils/logger";
import router from "./routes";
import { errorHandler, requestHandler } from "./middleware";
import { connectionCheck } from "./database";

dotenv.config();
const app = express();
const port = process.env.APP_PORT || 3000;

const startServer = async () => {
  app.set("trust proxy", true);
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(cors());
  app.use(helmet());

  app.use(express.static(`${__dirname}/public`));

  app.use(requestHandler);
  app.use("/api", router());
  app.use((req, res) => {
    res.status(404).send({ message: "Not Found" });
  });
  app.use(errorHandler);

  app.listen(port, () => {
    console.clear();
    logger.info(
      `Server Running at http://localhost:${port}/ or http://127.0.0.1:${port}/`
    );
  });
  connectionCheck();
};

startServer();
