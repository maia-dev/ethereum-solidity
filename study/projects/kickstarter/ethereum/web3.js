import Web3 from "web3";

const secrets = require("./secrets.json");

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // We are n the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // Here I'm passing the secrets so this only works server side.
  // (the app doesn't worki without metaMast)
  // To be able to fetch data from a browser without metamask we
  //   should pass a string with the infura URL
  const provider = new Web3.providers.HttpProvider(secrets.infura);
  web3 = new Web3(provider);
}

export default web3;
