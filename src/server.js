import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";

import mediaRouter from "./services/media/index.js";
import reviewsRouter from "./services/review/index.js";

import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  forbiddenErrorHandler,
  catchAllErrorHandler,
} from "./errorHandlers.js";

const port = process.env.PORT || 3001;

const server = express();

const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_PROD_URL];

// ********** MIDDLEWARES ********
server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Access Denied!"));
      }
    },
  })
);
server.use(express.json());

// ********** ENDPOINTS ********

server.use("/media", mediaRouter);
server.use("/reviews", reviewsRouter);

// ********** ERROR MIDDLEWARES ********
server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(forbiddenErrorHandler);
server.use(catchAllErrorHandler);

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
