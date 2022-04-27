import { ethers } from "hardhat";
import { expect } from "chai";
import { describe } from "mocha";
import { BigNumber } from "ethers";

describe("fxPriceFeed: SGD_ETH Matic", () => {
	let contractString = "SGD_ETH";
	let accounts;
	let SGD_USDPriceFeedAddress = "0x8CE3cAc0E6635ce04783709ca3CC4F5fc5304299";
	let ETH_USDPriceFeedAddress = "0xF9680D99D6C9589e2a93a78A04A279e509205945";
	let SGD_USDPriceContract;
	let ETH_USDPriceContract;
	let fxPriceFeedContract;

	before("", async () => {
		await ethers.provider.send("hardhat_reset", [
			{
				forking: {
					jsonRpcUrl:
						process.env.MATIC_URL,
				},
			},
		]);
		accounts = await ethers.getSigners();
		SGD_USDPriceContract = await ethers.getContractAt(
			"AggregatorV3Interface",
			SGD_USDPriceFeedAddress
		);
		ETH_USDPriceContract = await ethers.getContractAt(
			"AggregatorV3Interface",
			ETH_USDPriceFeedAddress
		);
	});

	beforeEach("", async () => {
		let fxPriceFeedFactory = await ethers.getContractFactory(
			"fxPriceFeed",
			accounts[0]
		);

		fxPriceFeedContract = await fxPriceFeedFactory.deploy(
			SGD_USDPriceFeedAddress,
			ETH_USDPriceFeedAddress,
			contractString
		);
	});

	it("returns decimals", async () => {
		await expect(await fxPriceFeedContract.decimals()).to.equal(18);
	});

	it("computes the price appropriately", async () => {
		let basePrice = (await SGD_USDPriceContract.latestRoundData()).answer;
		let quotePrice = (await ETH_USDPriceContract.latestRoundData()).answer;
		let derivedPrice = await fxPriceFeedContract.latestAnswer();
		let derivedDecimals = await fxPriceFeedContract.decimals();
		const calculatedPrice = basePrice
			.mul(BigNumber.from(10).pow(derivedDecimals))
			.div(quotePrice);
		await expect(derivedPrice.eq(calculatedPrice)).to.true;
	});
});
describe("fxPriceFeed: SGD_ETH Mainnet", () => {
	let contractString = "SGD_ETH";
	let accounts;
	let SGD_USDPriceFeedAddress = "0xe25277fF4bbF9081C75Ab0EB13B4A13a721f3E13";
	let ETH_USDPriceFeedAddress = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
	let SGD_USDPriceContract;
	let ETH_USDPriceContract;
	let fxPriceFeedContract;

	before("", async () => {
		await ethers.provider.send("hardhat_reset", [
			{
				forking: {
					jsonRpcUrl: process.env.MAINNET_URL,
				},
			},
		]);
		accounts = await ethers.getSigners();
		SGD_USDPriceContract = await ethers.getContractAt(
			"AggregatorV3Interface",
			SGD_USDPriceFeedAddress
		);
		ETH_USDPriceContract = await ethers.getContractAt(
			"AggregatorV3Interface",
			ETH_USDPriceFeedAddress
		);
	});

	beforeEach("", async () => {
		let fxPriceFeedFactory = await ethers.getContractFactory(
			"fxPriceFeed",
			accounts[0]
		);

		fxPriceFeedContract = await fxPriceFeedFactory.deploy(
			SGD_USDPriceFeedAddress,
			ETH_USDPriceFeedAddress,
			contractString
		);
	});

	it("returns decimals", async () => {
		await expect(await fxPriceFeedContract.decimals()).to.equal(18);
	});

	it("computes the price appropriately", async () => {
		let basePrice = (await SGD_USDPriceContract.latestRoundData()).answer;
		let quotePrice = (await ETH_USDPriceContract.latestRoundData()).answer;
		let derivedPrice = await fxPriceFeedContract.latestAnswer();
		let derivedDecimals = await fxPriceFeedContract.decimals();
		const calculatedPrice = basePrice
			.mul(BigNumber.from(10).pow(derivedDecimals))
			.div(quotePrice);
		await expect(derivedPrice.eq(calculatedPrice)).to.true;
	});
});
describe("fxPriceFeed: PHP_ETH Matic", () => {
	let contractString = "PHP_ETH";
	let accounts;
	let PHP_USDPriceFeedAddress = "0x218231089Bebb2A31970c3b77E96eCfb3BA006D1";
	let ETH_USDPriceFeedAddress = "0xF9680D99D6C9589e2a93a78A04A279e509205945";
	let PHP_USDPriceContract;
	let ETH_USDPriceContract;
	let fxPriceFeedContract;

	before("", async () => {
		await ethers.provider.send("hardhat_reset", [
			{
				forking: {
					jsonRpcUrl:
						process.env.MATIC_URL
				},
			},
		]);
		accounts = await ethers.getSigners();
		PHP_USDPriceContract = await ethers.getContractAt(
			"AggregatorV3Interface",
			PHP_USDPriceFeedAddress
		);
		ETH_USDPriceContract = await ethers.getContractAt(
			"AggregatorV3Interface",
			ETH_USDPriceFeedAddress
		);
	});

	beforeEach("", async () => {
		let fxPriceFeedFactory = await ethers.getContractFactory(
			"fxPriceFeed",
			accounts[0]
		);

		fxPriceFeedContract = await fxPriceFeedFactory.deploy(
			PHP_USDPriceFeedAddress,
			ETH_USDPriceFeedAddress,
			contractString
		);
	});

	it("returns decimals", async () => {
		expect(await fxPriceFeedContract.decimals()).to.equal(18);
	});

	it("computes the price appropriately", async () => {
		let basePrice = (await PHP_USDPriceContract.latestRoundData()).answer;
		let quotePrice = (await ETH_USDPriceContract.latestRoundData()).answer;
		let derivedPrice = await fxPriceFeedContract.latestAnswer();
		let derivedDecimals = await fxPriceFeedContract.decimals();
		const calculatedPrice = basePrice
			.mul(BigNumber.from(10).pow(derivedDecimals))
			.div(quotePrice);
		expect(derivedPrice.eq(calculatedPrice)).to.true;
	});
});
describe("fxPriceFeed: PHP_ETH Mainnet", () => {
	let contractString = "PHP_ETH";
	let accounts;
	let PHP_USDPriceFeedAddress = "0x9481e7ad8BE6BbB22A8B9F7B9fB7588d1df65DF6";
	let ETH_USDPriceFeedAddress = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
	let PHP_USDPriceContract;
	let ETH_USDPriceContract;
	let fxPriceFeedContract;

	before("", async () => {
		await ethers.provider.send("hardhat_reset", [
			{
				forking: {
					jsonRpcUrl:
						process.env.MAINNET_URL

				},
			},
		]);
		accounts = await ethers.getSigners();
		PHP_USDPriceContract = await ethers.getContractAt(
			"AggregatorV3Interface",
			PHP_USDPriceFeedAddress
		);
		ETH_USDPriceContract = await ethers.getContractAt(
			"AggregatorV3Interface",
			ETH_USDPriceFeedAddress
		);
	});

	beforeEach("", async () => {
		let fxPriceFeedFactory = await ethers.getContractFactory(
			"fxPriceFeed",
			accounts[0]
		);

		fxPriceFeedContract = await fxPriceFeedFactory.deploy(
			PHP_USDPriceFeedAddress,
			ETH_USDPriceFeedAddress,
			contractString
		);
	});

	it("returns decimals", async () => {
		expect(await fxPriceFeedContract.decimals()).to.equal(18);
	});

	it("computes the price appropriately", async () => {
		let basePrice = (await PHP_USDPriceContract.latestRoundData()).answer;
		let quotePrice = (await ETH_USDPriceContract.latestRoundData()).answer;
		let derivedPrice = await fxPriceFeedContract.latestAnswer();
		let derivedDecimals = await fxPriceFeedContract.decimals();
		const calculatedPrice = basePrice
			.mul(BigNumber.from(10).pow(derivedDecimals))
			.div(quotePrice);
		expect(derivedPrice.eq(calculatedPrice)).to.true;
	});
});
describe("fxPriceFeed: PHP_ETH Arbitrum", () => {
	let contractString = "PHP_ETH";
	let accounts;
	let PHP_USDPriceFeedAddress = "0xfF82AAF635645fD0bcc7b619C3F28004cDb58574"; // PHP_USDPriceFeed Arbitrum
	let ETH_USDPriceFeedAddress = "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612"; // ETH_USDPriceFeed Arbitrum
	let PHP_USDPriceContract;
	let ETH_USDPriceContract;
	let fxPriceFeedContract;

	before("", async () => {
		await ethers.provider.send("hardhat_reset", [
			{
				forking: {
					jsonRpcUrl:
						process.env.ARBITRUM_URL

				},
			},
		]);
		accounts = await ethers.getSigners();
		PHP_USDPriceContract = await ethers.getContractAt(
			"AggregatorV3Interface",
			PHP_USDPriceFeedAddress
		);
		ETH_USDPriceContract = await ethers.getContractAt(
			"AggregatorV3Interface",
			ETH_USDPriceFeedAddress
		);
	});

	beforeEach("", async () => {
		let fxPriceFeedFactory = await ethers.getContractFactory(
			"fxPriceFeed",
			accounts[0]
		);

		fxPriceFeedContract = await fxPriceFeedFactory.deploy(
			PHP_USDPriceFeedAddress,
			ETH_USDPriceFeedAddress,
			contractString
		);
	});

	it("returns decimals", async () => {
		expect(await fxPriceFeedContract.decimals()).to.equal(18);
	});

	it("computes the price appropriately", async () => {
		let basePrice = (await PHP_USDPriceContract.latestRoundData()).answer;
		let quotePrice = (await ETH_USDPriceContract.latestRoundData()).answer;
		let derivedPrice = await fxPriceFeedContract.latestAnswer();
		let derivedDecimals = await fxPriceFeedContract.decimals();
		const calculatedPrice = basePrice
			.mul(BigNumber.from(10).pow(derivedDecimals))
			.div(quotePrice);
		expect(derivedPrice.eq(calculatedPrice)).to.true;
	});
});
describe("fxPriceFeed: AUD_ETH Arbitrum", () => {
	let contractString = "AUD_ETH";
	let accounts;
	let AUD_USDPriceFeedAddress = "0x9854e9a850e7C354c1de177eA953a6b1fba8Fc22";
	let ETH_USDPriceFeedAddress = "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612";
	let AUD_USDPriceContract;
	let ETH_USDPriceContract;
	let fxPriceFeedContract;

	before("", async () => {
		await ethers.provider.send("hardhat_reset", [
			{
				forking: {
					jsonRpcUrl:
						process.env.ARBITRUM_URL
				},
			},
		]);
		accounts = await ethers.getSigners();
		AUD_USDPriceContract = await ethers.getContractAt(
			"AggregatorV3Interface",
			AUD_USDPriceFeedAddress
		);
		ETH_USDPriceContract = await ethers.getContractAt(
			"AggregatorV3Interface",
			ETH_USDPriceFeedAddress
		);
	});

	beforeEach("", async () => {
		let fxPriceFeedFactory = await ethers.getContractFactory(
			"fxPriceFeed",
			accounts[0]
		);

		fxPriceFeedContract = await fxPriceFeedFactory.deploy(
			AUD_USDPriceFeedAddress,
			ETH_USDPriceFeedAddress,
			contractString
		);
	});

	it("returns decimals", async () => {
		expect(await fxPriceFeedContract.decimals()).to.equal(18);
	});

	it("computes the price appropriately", async () => {
		let basePrice = (await AUD_USDPriceContract.latestRoundData()).answer;
		let quotePrice = (await ETH_USDPriceContract.latestRoundData()).answer;
		let derivedPrice = await fxPriceFeedContract.latestAnswer();
		let derivedDecimals = await fxPriceFeedContract.decimals();
		const calculatedPrice = basePrice
			.mul(BigNumber.from(10).pow(derivedDecimals))
			.div(quotePrice);
		expect(derivedPrice.eq(calculatedPrice)).to.true;
	});
});
