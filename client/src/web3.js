import Web3 from "web3";
import { truffle_development_network } from "./config.js";

var web3;

if (typeof window.web3 !== "undefined") {
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider(truffle_development_network));
}
export default web3;
