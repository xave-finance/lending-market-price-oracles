// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";


contract fxPriceFeed {
    using SafeCast for uint;

    string public priceFeed;

    AggregatorV3Interface public basePriceFeed;
    AggregatorV3Interface public quotePriceFeed;

    uint8 public decimals;

    constructor(
        AggregatorV3Interface _basePriceFeed,
        AggregatorV3Interface _quotePriceFeed,
        string memory _priceFeed
    ) {
        basePriceFeed = _basePriceFeed;
        quotePriceFeed = _quotePriceFeed;
        priceFeed = _priceFeed;
        decimals = 18;
    }

    function latestAnswer() external view returns (int256) {
        int256 _decimals = (10**(uint256(decimals))).toInt256();
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
            return _price * ((10**(uint256(_decimals - _priceDecimals))).toInt256());
        } else if (_priceDecimals > _decimals) {
            return _price / ((10**(uint256(_priceDecimals - _decimals))).toInt256());
        }
        return _price;
    }
}
