var Web3 = require("web3");
var ABI = require("../client/src/contracts/ProjectFactory.json");
var projectABI = require("../client/src/contracts/Project.json");
const { ethers } = require("ethers");

const url = "http://localhost:9545";
const factoryContractAddress = "0x224b4beFf9d3Eb0e2A241e1ba631f007eC0f6d86";

var web3 = new Web3(url);
const FactoryContract = new web3.eth.Contract(ABI.abi, factoryContractAddress);
const provider = new ethers.providers.JsonRpcProvider(url);
const FactoryContractEthers = new ethers.Contract(
  factoryContractAddress,
  ABI.abi,
  provider
);

FactoryContractEthers.on("ProjectStarted", (a, b, c, d, e, f, g) => {
  console.log(a, b, c, d, e, f, g);
  FactoryContract.methods
    .getProjectLists()
    .call()
    .then((e) => {
      if (e.length > 0) {
        projectAddress = e[0]["projectAddress"];
        const ProjectContract = new web3.eth.Contract(
          projectABI.abi,
          projectAddress
        );

        ProjectContract.methods
          .getProjectDetails()
          .call()
          .then((e) => console.log(e));
      }
      console.log(e);
    });
});
