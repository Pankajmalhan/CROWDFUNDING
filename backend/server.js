require("dotenv").config();
const express = require("express");
const initMongo = require("./config/mongo");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// const { userRouter } = require("./routes/users");

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

// Init all other stuff
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(require("./routes"));

// Setup express server port from ENV, default: 3000
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"));

// app.use("/user", userRouter);

initMongo();
