import { useAccount } from "wagmi";
import Web3 from "web3";
import {
  PACO_BNB_PAIR,
  PAIR_ABI,
  PACO_BTCB_PAIR,
  TOKEN_ABI,
  PACO_ADDRESS,
  BTCB_ADDRESS,
} from "../utils/contract";
import toast from "react-hot-toast";
export default function useSwap() {
  const { address } = useAccount();

  const getWeb3 = (mode = "read") => {
    if (mode === "read") {
      if (!window.ethereum) return alert("Please install Metamask");
      return new Web3(window.ethereum);
    } else if (mode === "write") {
      if (!window.ethereum) return alert("Please install Metamask");
      return new Web3(window.ethereum);
    }
  };

  const getContract = async (web3, address, abi) => {
    if (!web3) return alert("Please install Metamask");
    if (!abi || !address) return toast.error("ABI or address is missing");
    try {
      const _contract = new web3.eth.Contract(abi, address);
      // const _name = await _contract.methods.name().call();
      // console.log(_name);
      // console.log(_contract);
      return _contract;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const approve = async (token, pair, amount) => {
    if (!token || !pair)
      return alert("Development error: token or pair is missing");
    if (!amount || amount <= 0) return alert("Please enter amount to approve");

    try {
      // check for allownace
      //get token name
      let _name = await token.methods.name().call();

      // approve
      await token.methods
        .approve(pair, Web3.utils.toWei(amount.toString(), "ether"))
        .send({ from: address });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getAlloawnce = async (token, pair) => {
    try {
      let _approvedAmount = await token.methods.allowance(address, pair).call();
      _approvedAmount = Web3.utils.fromWei(_approvedAmount, "ether");
      return _approvedAmount;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const swap = async (pair, tokenIn, isToken0, amount, tokenInAddress) => {
    if (!address) return toast.error("Please connect your wallet");
    if (!pair) return toast.error("Development error: pair is missing");
    const _amount = Web3.utils.toWei(amount.toString(), "ether");

    try {
      // approve
      // await approve(tokenIn, pair._address, amount);

      await pair.methods.swap(tokenInAddress, _amount).send({ from: address });
    } catch (err) {
      console.log(err);
    }
  };

  const pacoBalance = async () => {
    if (!address) return toast.error("Please connect your wallet");
    try {
      const web3 = getWeb3("read");
      const token = await getContract(web3, PACO_ADDRESS, TOKEN_ABI);
      const _balance = await token.methods.balanceOf(address).call();
      // console.log(_balance);
      return Web3.utils.fromWei(_balance, "ether");
    } catch (err) {
      console.log(err);
    }
  };

  /*
  
    @prams pair: contract
    @prams amount1: amount of token1 to provide liquidity
    @prams amount2: amount of token2 to provide liquidity

  */
  const provideLiquidity = async (pair, amount1, amount2) => {
    if (!address) return toast.error("Please connect your wallet");
    if (!pair) return toast.error("Development error: pair is missing");
    if (!amount1 || (!amount2 && amount1 <= 0) || amount2 <= 0)
      return toast.error("Please enter amount to provide liquidity");
    console.log(amount1, amount2);
    try {
      await pair.methods
        .addLiquidity(
          Web3.utils.toWei(amount1.toString(), "ether"),
          Web3.utils.toWei(amount2.toString(), "ether")
        )
        .send({ from: address });
      return true;
    } catch (err) {
      return false;
    }
  };

  const removeLiquidity = async (pair, amount) => {};

  const getApprovedAmount = async (token, pair) => {
    // get the already aprroved amount of token for pair.
  };

  const getswapableAmount = async (pair, isToken0, amount) => {
    console.log(isToken0, amount);
    if (!pair) return toast.error("Development error: pair is missing"); //TODO: remove this
    // get reserves
    let reserve0 = await pair.methods.reserve0().call();
    let reserve1 = await pair.methods.reserve1().call();

    reserve0 = Web3.utils.fromWei(reserve0, "ether");
    reserve1 = Web3.utils.fromWei(reserve1, "ether");
    console.log(reserve0, reserve1);

    if (isToken0) {
      const _amountOut =
        (Number(amount) * Number(reserve1)) /
        (Number(reserve0) + Number(amount));

      if (amount < 1000) {
        // fee wii be 0.1%
        return _amountOut - _amountOut * 0.195;
      } else {
        // fee wii be 0.1%
        return _amountOut - _amountOut * 0.1;
      }

      // return amount of token1
      // return amount of token0
    } else {
      const _amountOut =
        (Number(amount) * Number(reserve0)) /
        (Number(reserve1) + Number(amount));

      if (amount < 1000) {
        // fee wii be 0.1%
        return _amountOut - _amountOut * 0.195;
      } else {
        // fee wii be 0.1%
        return _amountOut - _amountOut * 0.1;
      }
    }
  };

  const getLiquidityRatio = async (pair, isToken0, amount) => {
    if (!pair) return toast.error("Development error: pair is missing"); //TODO: remove this
    console.log(isToken0, amount);
    // get the reserve of token1 and token2
    let reserve0 = await pair.methods.reserve0().call();
    let reserve1 = await pair.methods.reserve1().call();

    reserve0 = Web3.utils.fromWei(reserve0, "ether");
    reserve1 = Web3.utils.fromWei(reserve1, "ether");
    console.log(reserve0, reserve1);
    if (reserve0 == 0 && reserve1 == 0) return amount;
    console.log(reserve0, reserve1);

    if (isToken0) {
      return (amount * reserve1) / reserve0; // return amount of token1
    } else {
      return (amount * reserve0) / reserve1; // return amount of token0
    }
  };

  return {
    getWeb3,
    getContract,
    approve,
    swap,
    provideLiquidity,
    removeLiquidity,
    getApprovedAmount,
    getswapableAmount,
    getAlloawnce,
    getLiquidityRatio,
    pacoBalance,
  };
}
