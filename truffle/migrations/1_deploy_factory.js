const ProjectFactory = artifacts.require("ProjectFactory");
const LibraryErrors = artifacts.require("LibraryErrors");

module.exports = function (deployer) {
  deployer.deploy(ProjectFactory);
  // deployer.deploy(LibraryErrors);
  // deployer.link(LibraryErrors,ProjectFactory);
  
};
