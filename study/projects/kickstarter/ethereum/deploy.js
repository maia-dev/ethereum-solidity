const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
const secrets = require("./secrets.json");

const provider = new HDWalletProvider(secrets.mnemonic, secrets.infura);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Atempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface),
  )
    .deploy({data: "0x" + compiledFactory.bytecode})
    .send({from: accounts[0]});

  console.log("Contract deployed to ", result.options.address);
};

deploy();
