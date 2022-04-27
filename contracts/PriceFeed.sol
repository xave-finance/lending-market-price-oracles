// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract fxPriceFeed {
    string public priceFeed;

    AggregatorV3Interface public basePriceFeed;
    AggregatorV3Interface public quotePriceFeed;

    uint8 public decimals;

    constructor(
        AggregatorV3Interface _basePriceFeed,
        AggregatorV3Interface _quotePriceFeed,
        string memory _priceFeed
    ) public {
        basePriceFeed = _basePriceFeed;
        quotePriceFeed = _quotePriceFeed;
        priceFeed = _priceFeed;
        decimals = 18;
    }

    function latestAnswer() public view returns (int256) {
        int256 _decimals = int256(10**uint256(decimals));
        (, int256 basePrice, , , ) = basePriceFeed.latestRoundData();
        uint8 baseDecimals = basePriceFeed.decimals();

        basePrice = _scaleprice(basePrice, baseDecimals, decimals);

        (, int256 quotePrice, , , ) = quotePriceFeed.latestRoundData();
        uint8 quoteDecimals = quotePriceFeed.decimals();
        quotePrice = _scaleprice(quotePrice, quoteDecimals, decimals);

        return (basePrice * _decimals) / quotePrice;
    }

    function _scaleprice(
        int256 _price,
        uint8 _priceDecimals,
        uint8 _decimals
    ) internal pure returns (int256) {
        if (_priceDecimals < _decimals) {
            return _price * int256(10**uint256(_decimals - _priceDecimals));
        } else if (_priceDecimals > _decimals) {
            return _price / int256(10**uint256(_priceDecimals - _decimals));
        }
        return _price;
    }
}
