import * as dotenv from "dotenv";
import * as deployPriceFeed from "./scripts/deployPriceFeed";
import * as deployHLPOracle from "./scripts/deployHLP";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deployHLPOracle", "deploys HLPPriceFeedOracle Contract")
  .addParam("networkName", "Provide the name of the network to which the contract must be deployed")
  .setAction(async (taskArgs, hre) => {
    await deployHLPOracle.deploy(taskArgs.networkName, hre);
  });

task("deployPriceFeed", "deploys fxPriceFeed Contract")
  .addParam("networkName", "Provide the name of the network to which the contract must be deployed")
  .addParam("fxCurrency", "Provide the currency for the contract has to be deployed")
  .setAction(async (taskArgs, hre) => {
    await deployPriceFeed.deploy(taskArgs.networkName, taskArgs.fxCurrency, hre);
  });


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  defaultNetwork:"hardhat",
  networks: {
    truffle: {
      url: "http://localhost:24012/rpc"
    },
    mainnet: {
      url: process.env.MAINNET_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    matic: {
      url: process.env.MATIC_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    arbitrum: {
      url: process.env.ARBITRUM_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    hardhat: {}
  }
  // gasReporter: {
  //   enabled: true,
  //   currency: "USD",
  // }
};

export default config;
