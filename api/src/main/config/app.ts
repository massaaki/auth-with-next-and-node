import express from "express";

import setupMiddlewares from "./setup/setup-middlewares";
import setupRoutes from "./setup/setup-routes";

const app = express();
setupMiddlewares(app);
setupRoutes(app);

export default app;
