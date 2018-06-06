import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x5F26C8ED3fF08f1224b6d7D90d3668Bed54580fc",
);

export default instance;
