export async function deploy(network_name, fxCurrency, hre) {
  const networks = {
    "mainnet": {
      "SGD": {
        "baseContract": "0xe25277fF4bbF9081C75Ab0EB13B4A13a721f3E13",
        "quoteContract": "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"
      },
      "PHP": {
        "baseContract": "0x9481e7ad8BE6BbB22A8B9F7B9fB7588d1df65DF6",
        "quoteContract": "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"
      }
    },
    "matic": {
      "SGD": {
        "baseContract": "0x8CE3cAc0E6635ce04783709ca3CC4F5fc5304299",
        "quoteContract": "0xF9680D99D6C9589e2a93a78A04A279e509205945"
      },
      "PHP": {
        "baseContract": "0x218231089Bebb2A31970c3b77E96eCfb3BA006D1",
        "quoteContract": "0xF9680D99D6C9589e2a93a78A04A279e509205945"
      }
    },
    "arbitrum": {
      "PHP": {
        "baseContract": "0xfF82AAF635645fD0bcc7b619C3F28004cDb58574",
        "quoteContract": "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612"
      },
      "AUD": {
        "baseContract": "0x9854e9a850e7C354c1de177eA953a6b1fba8Fc22",
        "quoteContract": "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612"
      },
      "USDC": {
        "baseContract": "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3",
        "quoteContract": "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612"
      },
      "USDT": {
        "baseContract": "0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7",
        "quoteContract": "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612"
      }
    }
  }
  const fxPriceFeedFactory = await hre.ethers.getContractFactory("fxPriceFeed");
  const fxPriceFeedContract = await fxPriceFeedFactory.deploy(
    networks[network_name][fxCurrency].baseContract,
    networks[network_name][fxCurrency].quoteContract,
    `${fxCurrency}_ETH`
  );
  await fxPriceFeedContract.deployed();
  console.log(`FxPriceFeed Contract for ${fxCurrency} for the ${network_name} network has been deployed at the address --> ${fxPriceFeedContract.address} on ${network_name} name`);
}

