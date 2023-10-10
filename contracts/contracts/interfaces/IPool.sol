//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IPool{
    function swap(address _tokenIn, uint256 _amountIn) external returns (uint256 _amountOut);
    function addLiquidity(uint _amount0, uint _amount1)external returns(uint shares);
    function removeLiquidity(
        uint _shares
    )  external returns (uint amount0, uint amount1);
}