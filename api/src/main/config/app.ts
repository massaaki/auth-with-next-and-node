import express from "express";

import createConnection from "./database/postgres-typeorm";
import setupMiddlewares from "./setup/setup-middlewares";
import setupRoutes from "./setup/setup-routes";

createConnection();
const app = express();
setupMiddlewares(app);
setupRoutes(app);

export default app;
