/*
  Try `truffle exec scripts/increment.js`, you should `truffle migrate` first.

  Learn more about Truffle external scripts: 
  https://trufflesuite.com/docs/truffle/getting-started/writing-external-scripts
*/

const Factory = artifacts.require("ProjectFactory");

module.exports = async function (callback) {
  const deployed = await Factory.deployed();

  const project = await deployed.getProjectLists();
  console.log(`Project ${project}`);

  callback();
};
