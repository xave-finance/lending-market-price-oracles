# PriceOracle

## Install dependencies

`yarn`

## Testing

`yarn test`

## Prerequisite

- You should `truffle` installed and
- in a terminal run `truffle dashboard`
- once that is done a tab in your default browser should open up. It will connect to your metamask and hence ensure that you are connected to the right network before calling the following script commands

## Deploy FxPriceFeedOracle

Run a Hardhat task with the name `deployPriceFeed`. It will take two parameters:

- networkName: This can be either "matic", "mainnet" or "arbitrum"
- fxCurrency: This can be either "PHP","SGD" or "AUD"

Eg:

`npx hardhat deployPriceFeed --network-name matic --fx-currency PHP --network truffle`

Please note that

- SGD is supported on mainnet and matic;
- PHP is supported on mainnet, matic and arbitrum and
- AUD is on only on arbitrum

## Deploy HLPPriceFeedOracle

Run a Hardhat task with the name `deployHLPOracle`. It will take one parameter:

- networkName: This can be either "matic", "mainnet"
- fxCurrency: This can be either "PHP","SGD" or "AUD"

Eg:

`npx hardhat deployHLPOracle --network-name matic --fx-currency PHP --network truffle`
