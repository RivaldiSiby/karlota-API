require("dotenv").config();
// express
const express = require("express");
const server = express();
// cors
const cors = require("cors");
// connect
const mainRouter = require("./src/routers/index");
const db = require("./src/config/orm/db");
const { redisConnect } = require("./src/config/cache/redis");

// logger
const logger = require("morgan");
const { cloudinaryConfig } = require("./src/config/cloud/cloudinary");

const init = async () => {
  try {
    // connect
    await db.authenticate();
    await db.sync({ alter: true });
    await redisConnect();
    // info connect
    console.log("All connect has been connected");
    // logger
    if (process.env.APP_STATUS === "development") {
      server.use(
        logger(":method :url :status :res[content-length] - :response-time ms")
      );
    }
    // body payload

    // parse application/json
    server.use(express.json());
    // handler/middleware urlencoded
    // parse application/x-www-form-urlencoded
    server.use(express.urlencoded({ extended: true }));

    // cors
    const corsOptions = {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
      allowedHeaders: ["Content-Type", "Authorization"],
    };
    server.use(cors(corsOptions));
    // cloudinary
    server.use(cloudinaryConfig);
    // Router
    server.use(mainRouter);
    // start server
    server.listen(process.env.APP_PORT, () => {
      console.log(`Server is Running at port ${process.env.APP_PORT}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Server Error");
  }
};

// server
init();
