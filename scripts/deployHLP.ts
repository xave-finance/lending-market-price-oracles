import { LedgerSigner } from "@anders-t/ethers-ledger";
const IS_LEDGER_SIGNER = true;
const LEDGER_ACCOUNT_PATH = "44'/60'/0'/0/0";

export async function deploy(network_name, fxCurrency, hre) {
  const networks = {
    mainnet: {
      XSGD: {
        baseContract: "0x64DCbDeb83e39f152B7Faf83E5E5673faCA0D42A",
        quoteContract: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
        contractName: "HLPxSGD_ETH",
      },
      EURS: {
        baseContract: "0xAd0e5e0778cAC28f1ff459602b31351871B5754a",
        quoteContract: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
        contractName: "BPT_EURS_ETH",
      },
      DAI: {
        baseContract: "0x66bB9D104c55861feb3Ec3559433F01f6373c966",
        quoteContract: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
        contractName: "BPT_DAI_ETH",
      },
    },
    matic: {
      TAGPHP: {
        baseContract: "0x6156f030B877344470BAC075a708d7E27602cc17",
        quoteContract: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
        contractName: "HLPxSGD_ETH",
      },
    },
  };

  const hlpPriceFeedOracleFactory = await hre.ethers.getContractFactory(
    "hlpPriceFeedOracle"
  );
  const provider = hlpPriceFeedOracleFactory.signer.provider;
  const signer = IS_LEDGER_SIGNER
    ? await new LedgerSigner(provider, LEDGER_ACCOUNT_PATH)
    : hlpPriceFeedOracleFactory.signer;
  // const estimatedGas = await fxPriceFeedFactory.signer.provider.estimateGas(fxPriceFeedFactory.getDeployTransaction(networks[network_name][fxCurrency].baseContract,networks[network_name][fxCurrency].quoteContract,`${fxCurrency}_ETH`).data)
  // console.log(await fxPriceFeedFactory.signer.getBalance());
  const hlpPriceFeedOracleContract = await hlpPriceFeedOracleFactory
    .connect(signer)
    .deploy(
      networks[network_name][fxCurrency].baseContract,
      networks[network_name][fxCurrency].quoteContract,
      networks[network_name][fxCurrency].contractName
    );
  await hlpPriceFeedOracleContract.deployed();
  console.log(
    `hlpPriceFeedOracle Contract for ${networks[network_name][fxCurrency].contractName} for the ${network_name} network has been deployed at the address --> ${hlpPriceFeedOracleContract.address} on ${network_name} name`
  );
}
