import { ethers } from "hardhat";
import { expect } from "chai";
import { describe } from "mocha";
import { BigNumber } from "ethers";

const scaleprice = (
	price,
	priceDecimals,
	decimals
) => {
	if (priceDecimals < decimals) {
		return price.mul((BigNumber.from(10)).pow(decimals.sub(priceDecimals)));
	} else if (priceDecimals > decimals) {
		return price.div(BigNumber.from(10).pow(priceDecimals.sub(decimals)));
	}
	return price;
}

describe("hlpPriceFeedOracle: HLPxSGD_ETH Mainnet", () => {
	let contractString = "HLPxSGD_ETH";
	let accounts;
	let HLPxSGDUSDCAddress = "0x64DCbDeb83e39f152B7Faf83E5E5673faCA0D42A";
	let ETH_USDPriceFeedAddress = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
	let HLPxSGDUSDCContract;
	let ETH_USDPriceContract;
	let hlpPriceFeedOracleContract;

	before("", async () => {
		await ethers.provider.send("hardhat_reset", [
			{
				forking: {
					jsonRpcUrl: process.env.MAINNET_URL,
				},
			},
		]);
		accounts = await ethers.getSigners();
		HLPxSGDUSDCContract = await ethers.getContractAt(
			"hlpContract",
			HLPxSGDUSDCAddress
		);
		ETH_USDPriceContract = await ethers.getContractAt(
			"AggregatorV3Interface",
			ETH_USDPriceFeedAddress
		);
	});

	beforeEach("", async () => {
		let hlpPriceFeedOracleFactory = await ethers.getContractFactory(
			"hlpPriceFeedOracle",
			accounts[0]
		);

		hlpPriceFeedOracleContract = await hlpPriceFeedOracleFactory.deploy(
			HLPxSGDUSDCAddress,
			ETH_USDPriceFeedAddress,
			contractString
		);
	});

	it("returns decimals", async () => {
		await expect(await hlpPriceFeedOracleContract.decimals()).to.equal(18);
	});

	it("computes the price appropriately", async () => {
		let liquidity = await HLPxSGDUSDCContract.liquidity();
        let totalSupply = await HLPxSGDUSDCContract.totalSupply();
		let decimals = await hlpPriceFeedOracleContract.decimals();
		let hlp_usd = ((totalSupply.mul(BigNumber.from(10).pow(decimals))).div(liquidity));

		let quotePrice = (await ETH_USDPriceContract.latestRoundData()).answer;
		let quoteDecimals = await ETH_USDPriceContract.decimals();
		let scaledPrice = scaleprice(quotePrice,quoteDecimals,BigNumber.from(decimals));

		let computedPrice = (hlp_usd.mul(BigNumber.from(10).pow(decimals))).div(scaledPrice);		
		let derivedPrice = await hlpPriceFeedOracleContract.latestAnswer();

		await expect(derivedPrice.eq(computedPrice)).to.true;
	});
});

describe("hlpPriceFeedOracle: HLPtagPHPUSDC_ETH Matic", () => {
	let contractString = "HLP_tagPHPUSDC_ETH";
	let accounts;
	let HLP_tagPHP_USDC_Address = "0x6156f030B877344470BAC075a708d7E27602cc17";
	let ETH_USDPriceFeedAddress = "0xF9680D99D6C9589e2a93a78A04A279e509205945";
	let HLP_tagPHP_USDC_Contract;
	let ETH_USDPriceContract;
	let hlpPriceFeedOracleContract;

	

	before("", async () => {
		await ethers.provider.send("hardhat_reset", [
			{
				forking: {
					jsonRpcUrl: process.env.MATIC_URL,
				},
			},
		]);
		accounts = await ethers.getSigners();
		HLP_tagPHP_USDC_Contract = await ethers.getContractAt(
			"hlpContract",
			HLP_tagPHP_USDC_Address
		);
		ETH_USDPriceContract = await ethers.getContractAt(
			"AggregatorV3Interface",
			ETH_USDPriceFeedAddress
		);
	});

	beforeEach("", async () => {
		let hlpPriceFeedOracleFactory = await ethers.getContractFactory(
			"hlpPriceFeedOracle",
			accounts[0]
		);

		hlpPriceFeedOracleContract = await hlpPriceFeedOracleFactory.deploy(
			HLP_tagPHP_USDC_Address,
			ETH_USDPriceFeedAddress,
			contractString
		);
	});

	it("returns decimals", async () => {
		await expect(await hlpPriceFeedOracleContract.decimals()).to.equal(18);
	});

	it("computes the price appropriately", async () => {
		let liquidity = await HLP_tagPHP_USDC_Contract.liquidity();
        let totalSupply = await HLP_tagPHP_USDC_Contract.totalSupply();
		let decimals = await hlpPriceFeedOracleContract.decimals();
		let hlp_tagPHP_usdc = ((totalSupply.mul(BigNumber.from(10).pow(decimals))).div(liquidity));

		let quotePrice = (await ETH_USDPriceContract.latestRoundData()).answer;
		let quoteDecimals = await ETH_USDPriceContract.decimals();
		let scaledPrice = scaleprice(quotePrice,quoteDecimals,BigNumber.from(decimals));

		let computedPrice = (hlp_tagPHP_usdc.mul(BigNumber.from(10).pow(decimals))).div(scaledPrice);		
		let derivedPrice = await hlpPriceFeedOracleContract.latestAnswer();
		
		await expect(derivedPrice.eq(computedPrice)).to.true;
	});
});
