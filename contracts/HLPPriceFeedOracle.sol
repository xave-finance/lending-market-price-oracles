// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

interface hlpContract {
    function liquidity() external view returns (uint);
    function totalSupply() external view returns (uint);
}

contract hlpPriceFeedOracle {
    using SafeMath for uint;

    string public priceFeed;

    hlpContract public baseContract;
    AggregatorV3Interface public quotePriceFeed;

    uint8 public decimals;

    constructor(
        hlpContract _baseContract,
        AggregatorV3Interface _quotePriceFeed,
        string memory _priceFeed
    ) public {
        baseContract = _baseContract;
        quotePriceFeed = _quotePriceFeed;
        priceFeed = _priceFeed;
        decimals = 18;
    }

    function latestAnswer() public view returns (int256) {
        uint256 _decimals = uint256(10**uint256(decimals));
        uint256 liquidity = baseContract.liquidity();
        uint256 totalSupply = baseContract.totalSupply();
        uint256 hlp_usd = (totalSupply.mul(_decimals)).div(liquidity);

        (, int256 quotePrice, , , ) = quotePriceFeed.latestRoundData();
        uint8 quoteDecimals = quotePriceFeed.decimals();
        quotePrice = _scaleprice(quotePrice, quoteDecimals, decimals);
        
        return ((int256(hlp_usd)*int256(10**18))/quotePrice);
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
