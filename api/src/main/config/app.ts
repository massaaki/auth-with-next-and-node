import express from "express";

import setupMiddlewares from "./setup/setup-middlewares";

const app = express();
setupMiddlewares(app);

export default app;
