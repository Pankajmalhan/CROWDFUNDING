import { ethers, utils } from "ethers";
import abi from "../contracts/ProjectFactory.json";
import web3 from "../web3";
import { factoryContractAddress } from "../config.js";

export const createNewProjectFC = async (data) => {
  try {
    if (window.ethereum) {
      // const contractAddress = "0x0fb80aCa322d2D792f6fc242eB6c9363eD171472";
      const networkID = await web3.eth.net.getId();
      const contractAddress = factoryContractAddress;
      const contractABI = abi.abi;
      let deadline = new Date(data.deadline).getTime();
      let minContri = Number(data.minimumContribution);
      let target = Number(data.targetPrice);

      const factoryContract = await new web3.eth.Contract(
        contractABI,
        contractAddress
      );

      const transact = await factoryContract.methods
        .createNewProject(
          data.title,
          data.description,
          target,
          deadline,
          minContri,
          data.cid
        )
        .send({ from: data?.publicAddress });

      console.log("Creating project", transact);
      const projectListing = await factoryContract.methods
        .getProjectLists()
        .call();

      console.log("Project created", projectListing);
      return transact;
    } else {
      console.log("Ethereum/Metamask not found, install Metamask.");
    }
  } catch (error) {
    console.log(error, "Error from CreateNewProject");
  }
};

export async function getProjectListingFC() {
  if (window.ethereum) {
    // const contractAddress = "0x0fb80aCa322d2D792f6fc242eB6c9363eD171472";
    const networkID = await web3.eth.net.getId();
    const contractAddress = abi.networks[networkID].address;
    const contractABI = abi.abi;

    const factoryContract = await new web3.eth.Contract(
      contractABI,
      contractAddress
    );
    const getPrj = await factoryContract.methods.getProjectLists().call();
    return getPrj;
  } else return;
}
