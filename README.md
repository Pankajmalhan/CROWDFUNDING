# React Truffle Box

This box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

## About this Projects
This is Crowdfunding Project, based on ether and token based.

## How to test contracts

### how to run mythril test runs
myth analyze contracts/Project.sol --solc-json remapping.json --max-depth 25 
Link: https://mythril-classic.readthedocs.io/en/master/tutorial.html

### slither
slither contracts/Project.sol --solc-args "--include-path=./node_modules --base-path=./contracts"