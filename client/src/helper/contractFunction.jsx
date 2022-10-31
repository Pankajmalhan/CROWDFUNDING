import { ethers, utils } from "ethers";
import abi from "./contracts/ProjectFactory.json";

//dummyData
export const data = { name: "Hello" };

//Common data
export const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
// export const provider = new ethers.providers.Web3Provider(window.ethereum);
export const contractABI = abi.abi;
export const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
export const factoryContract = new ethers.Contract(
  contractAddress,
  contractABI,
  signer
);

// createNewProject
export const createNewProjectFC = async () => {
  try {
    console.log(provider, contractABI, signer, factoryContract, "Check for undefined")
    if (window.ethereum) {
      const transact = await factoryContract.createNewProject(
        utils.formatBytes32String(data.name)
      );
      console.log("Creating project");
      await transact.wait();
      console.log("Project created", transact.hash);
    } else {
      console.log("Ethereum/Metamask not found, install Metamask.");
    }
  } catch (error) {
    console.log(error, "Error from CreateNewProject");
  }
};

// getProjectLists
export const getProjectListsFC = async () => {
  try {
    if (window.ethereum) {
      const transact = await factoryContract.getProjectLists();
      await transact.wait();
    } else {
      console.log("Ethereum/Metamask not found, install Metamask.");
    }
  } catch (error) {
    console.log(error, "Error from CreateNewProject");
  }
};

// getProjectInfoById
export const getProjectInfoByIdFC = async (id) => {
  try {
    if (window.ethereum) {
      const transact = await factoryContract.getProjectInfoById(
        utils.formatBytes32String(id)
      );
      await transact.wait();
    } else {
      console.log("Ethereum/Metamask not found, install Metamask.");
    }
  } catch (error) {
    console.log(error, "Error getProjectInfoByIdFC");
  }
};

// getProjectInfoByAddress
export const getProjectInfoByAddressFC = async(address)=>{
  try{
    if(window.ethereum){
      const transact = await factoryContract.getProjectInfoByAddress(
        utils.formatBytes32String(address)
      );
      await transact.wait();
    }
    else {
      console.log("Ethereum/Metamask not found, install Metamask.")
    }
  }
  catch(error){
    console.log(error, "Error from getProjectInfoByAddressFC")
  }
};

// getCurrentProjectID()
export const getCurrentProjectID = async (id) => {
  try {
    if (window.ethereum) {
      const transact = await factoryContract.getProjectInfoById();
      await transact.wait();
    } else {
      console.log("Ethereum/Metamask not found, install Metamask.");
    }
  } catch (error) {
    console.log(error, "Error getProjectInfoByIdFC");
  }
};
