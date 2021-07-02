import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import { join } from "path";

const port = process.env.PORT || 3001;

const server = express();

// ********** MIDDLEWARES ********
server.use(cors());
server.use(express.json());

// ********** ENDPOINTS ********

// ********** ERROR MIDDLEWARES ********

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
