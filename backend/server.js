require("dotenv").config();
const express = require("express");
const initMongo = require("./config/mongo");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var Web3 = require("web3");
var ABI = require("../client/src/contracts/ProjectFactory.json");
var projectABI = require("../client/src/contracts/Project.json");
const { ethers } = require("ethers");
const { createProject } = require("./controllers/project");
const Project = require("./models/project");

const url = "http://localhost:9545";
const factoryContractAddress = process.env.FACTORY_CONTRACT_ADDRESS;

var web3 = new Web3(url);
const FactoryContract = new web3.eth.Contract(ABI.abi, factoryContractAddress);
const provider = new ethers.providers.JsonRpcProvider(url);
const FactoryContractEthers = new ethers.Contract(
  factoryContractAddress,
  ABI.abi,
  provider
);

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

FactoryContractEthers.on(
  "ProjectStarted",
  (
    projectID,
    title,
    description,
    project_target_price,
    project_deadline_date,
    project_minimum_fund_price,
    projectOwner,
    contractAddress
  ) => {
    createProject(
      projectID,
      title,
      description,
      Number(project_target_price._hex),
      Number(project_deadline_date._hex),
      Number(project_minimum_fund_price._hex),
      projectOwner,
      contractAddress
    );
   }
);
