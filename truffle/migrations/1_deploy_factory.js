const ProjectFactory = artifacts.require("ProjectFactory");
const HelperFunctions = artifacts.require("HelperFunctions");
const LibraryErrors = artifacts.require("LibraryErrors");

module.exports = function (deployer) {
  deployer.deploy(ProjectFactory);
  deployer.deploy(HelperFunctions);
  deployer.deploy(LibraryErrors);
};
