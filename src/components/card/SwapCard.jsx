import { useState, useEffect } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import InputBox from "./InputBox";
import SwapButton from "./SwapButton";
import TokenModal from "../modal/TokenModal";
import { data } from "../../data/tokens";
import { cn } from "../../utils";
import {
  PACO_BNB_PAIR,
  PACO_BTCB_PAIR,
  PACO_USDT_PAIR,
  PACO_BUSD_PAIR,
  TOKEN_ABI,
  PAIR_ABI,
} from "../../utils/contract";
import useSwap from "../../hooks/useSwap";

import toast from "react-hot-toast";
import { useAccount } from "wagmi";

const pairs = {
  PACO_BNB: PACO_BNB_PAIR,
  PACO_BTCB: PACO_BTCB_PAIR,
  PACO_USDT: PACO_USDT_PAIR,
  PACO_BUSD: PACO_BUSD_PAIR,
};

function SwapCard() {
  const { address } = useAccount();
  const [tokens, setTokens] = useState([]);
  const [openTokenModal, setOpenTokenModal] = useState(false);
  const [position, setPosition] = useState(null);
  const [currentTab, setCurrentTab] = useState("swap");
  const {
    approve,
    getAlloawnce,
    getContract,
    getWeb3,
    provideLiquidity,
    getLiquidityRatio,
    getswapableAmount,
    swap,
    pacoBalance,
  } = useSwap();

  const [token, setToken] = useState({ first: data[0], second: data[1] });
  const [value, setValue] = useState({ first: "", second: "" });
  const [error, setError] = useState({ first: false, second: false });
  const [balance, setBalance] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [allowance1, setAllowance1] = useState(0);
  const [allowance2, setAllowance2] = useState(0);
  const [pair, setPair] = useState(pairs.PACO_BTCB);
  const [isLoading, setIsLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [pacoBal, setPacoBal] = useState(0);

  useEffect(() => {
    const _getPacoBalance = async () => {
      setPacoBal(await pacoBalance());
    };
    if (address) _getPacoBalance();
  }, [address]);

  useEffect(() => {
    setTokens(data);
    // setToken({ first: data[0], second: data[1] });
  }, []);

  const calc = (value) => {
    let val = 0;
    val = value;
    return val;
  };

  useEffect(() => {
    // check for allownace
    const web3 = getWeb3("read");
    const _checkAllowanceLiquidity = async () => {
      const _tokenContract1 = await getContract(
        web3,
        token.first.address,
        TOKEN_ABI
      );
      const _allownace1 = await getAlloawnce(_tokenContract1, pair);
      setAllowance1(_allownace1);
      const _tokenContract2 = await getContract(
        web3,
        token.second.address,
        TOKEN_ABI
      );
      const _allownace2 = await getAlloawnce(_tokenContract2, pair);
      setAllowance2(_allownace2);
    };

    const _checkAllowanceSwap = async () => {
      const _tokenContract = await getContract(
        web3,
        token.first.address,
        TOKEN_ABI
      );
      const _name = await _tokenContract.methods.name().call();
      const _allownace = await getAlloawnce(_tokenContract, pair);
      setAllowance(_allownace);
    };

    if (currentTab === "swap") {
      _checkAllowanceSwap();
    } else if (currentTab === "liquidity") {
      _checkAllowanceLiquidity();
    }
  }, [token, value, currentTab]);

  const handleChange = async (e) => {
    const update = { ...value };
    update[e.target.name] = Number(e.target.value);
    setValue(update);

    const delayDebounceFn = setTimeout(async () => {
      if (
        e.target.value === "" ||
        (parseFloat(e.target.value) >= 0 && !isNaN(e.target.value))
      ) {
        setIsLoading(true);
        let _value = 0;

        if (currentTab === "swap") {
          console.log("swap");
          const _pairContract = await getContract(
            getWeb3("read"),
            pair,
            PAIR_ABI
          );
          const _isToken0 = token.first.name === "PACO" ? true : false;
          _value = await getswapableAmount(
            _pairContract,
            _isToken0,
            Number(e.target.value)
          );
          console.log(_value);
          setValue({ ...update, second: _value });
        } else if (currentTab === "liquidity") {
          const _pair = getSelectedPair(token);

          const web3 = getWeb3("read");

          //get pair contract
          const _pairContract = await getContract(web3, _pair, PAIR_ABI);

          // check if token0 is PACO
          const _isToken0 = token.first.name === "PACO" ? true : false;
          // console.log(_isToken0);
          _value = await getLiquidityRatio(
            _pairContract,
            _isToken0,
            Number(e.target.value)
          );
          console.log(_value);

          setValue({ ...update, second: _value });
        }
        setIsLoading(false);
      }
    }, 4000);

    return () => clearTimeout(delayDebounceFn);
  };

  const handleToggleSwap = () => {
    // Update token value
    const { first: firstValue, second: secondValue } = value;
    const updateValue = { ...value };

    updateValue.first = secondValue;
    updateValue.second = firstValue;
    setValue(updateValue);

    // Update selected token
    const { first: firstToken, second: secondToken } = token;
    const updateToken = { ...token };

    updateToken.first = secondToken;
    updateToken.second = firstToken;
    setToken(updateToken);

    // Update token error
    const { first: firstError, second: secondError } = error;
    const updateError = { ...error };

    updateError.first = secondError;
    updateError.second = firstError;
    setError(updateError);
  };

  const getSelectedPair = (token) => {
    if (token.first.title === "PACO" && token.second.title === "BNB") {
      return PACO_BNB_PAIR;
    } else if (token.first.title === "PACO" && token.second.title === "BTCB") {
      return PACO_BTCB_PAIR;
    } else if (token.first.title === "PACO" && token.second.title === "USDT") {
      return PACO_USDT_PAIR;
    } else if (token.first.title === "PACO" && token.second.title === "BUSD") {
      return PACO_BUSD_PAIR;
    } else {
      throw new Error("Invalid pair");
    }
  };

  const handleSelectToken = (selectedToken) => {
    setOpenTokenModal(false);
    const updateToken = { ...token };

    position === 1
      ? (updateToken.first = selectedToken)
      : (updateToken.second = selectedToken);

    if (updateToken.first.name !== "PACO") {
      setToken({ ...updateToken, second: data[0] });
    } else {
      if (updateToken.second.name === "PACO") {
        toast.error("Please select a valid pair!");
      } else {
        setToken(updateToken);
      }
    }
    // get selected pair
    const selectedPair = getSelectedPair(updateToken);
    console.log(selectedPair);
    setPair(selectedPair);
  };

  const handleSetPosition = (position) => {
    setOpenTokenModal(true);
    setPosition(position);
  };

  const handleSubmit = async () => {
    if (currentTab == "swap") {
      // console.table(value);
      console.table(token);

      const { first: firstToken, second: secondToken } = token;

      // check pair
      const pair = `${firstToken.title}_${secondToken.title}`;
      console.log(pairs[pair]);
    } else if (currentTab == "liquidity") {
      console.log("liquidity");
      let temp = 0;
      // TODO: check of allownace
      const _web3 = getWeb3("write");
      try {
        const _token1Contract = await getContract(
          _web3,
          token.first.address,
          TOKEN_ABI
        );
        let _allowance = await getAlloawnce(_token1Contract, pair);
        // _allowance = Web3.utils.fromWei(_allowance.toString(), "ether");
        console.log(_allowance, value.first);
        if (_allowance < value.first) {
          const _trx2 = await approve(_token1Contract, pair, value.first);

          toast.success(`${token.first.title} approved successfully!`);
          temp = temp + 1;
        } else {
          temp = temp + 5;
          toast.success(`${token.first.title} already approved!`);
        }
        const _token2Contract = await getContract(
          _web3,
          token.second.address,
          TOKEN_ABI
        );
        let _allowance2 = await getAlloawnce(_token2Contract, pair);
        // _allowance2 = Web3.utils.fromWei(_allowance2.toString(), "ether");
        if (_allowance2 < value.second) {
          const _trx2 = await approve(_token2Contract, pair, value.second);
          toast.success(`${token.second.title} approved successfully!`);
          temp = temp + 1;
        } else {
          temp = temp + 7;
          toast.success(`${token.second.title} already approved!`);
        }
        console.log(temp);
        if (temp == 2 || temp == 12) {
          setIsApproved(true);
        }
      } catch (err) {
        toast.error("approving went wrong!");
      }
    }
  };
  const handleLiquidty = async () => {
    const _web3 = getWeb3("write");

    const _pairContract = await getContract(_web3, pair, PAIR_ABI);
    // console.log(_pairContract);
    const _trx = await provideLiquidity(
      _pairContract,
      value.first,
      value.second
    );
    if (_trx) {
      toast.success("Liquidity added successfully!");
    } else {
      toast.error("Liquidity adding went wrong!");
    }
  };

  const handleApprove = async () => {
    const _web3 = getWeb3("write");
    const _tokenContract = await getContract(
      _web3,
      token.first.address,
      TOKEN_ABI
    );
    const _trx = await approve(_tokenContract, pair, value.first);
    setIsApproved(true);
    toast.success("Approved successfully!");
  };

  const handleSwap = async () => {
    const _web3 = getWeb3("write");
    const _pairContract = await getContract(_web3, pair, PAIR_ABI);
    const _isToken0 = token.first.name === "PACO" ? true : false;
    const _tokenIn = await getContract(_web3, token.first.address, TOKEN_ABI);
    console.log("value", value.first);
    await swap(
      _pairContract,
      _tokenIn,
      _isToken0,
      value.first,
      token.first.address
    );
    toast.success("Swap successfully!");
  };

  const handleMaxClick = () => {
    // setValue({ ...value, first: allowance, second: calc(allowance) });
  };
  return (
    <div className="m-4 flex justify-center">
      <div className="flex flex-col gap-6 bg-[#3c2f61] text-white px-4 md:px-7 py-7 shadow-2xl rounded-3xl w-full min-w-[200px] max-w-[580px]">
        <div className="flex items-center justify-center gap-1 lg:gap-4 uppercase text-white text-sm lg:text-xl font-extrabold relative">
          <span
            className={cn(
              "border-b-8 border-transparent px-4 pb-2 z-10 cursor-pointer",
              currentTab === "swap" && "border-[#3e1444]"
            )}
            onClick={() => setCurrentTab("swap")}
          >
            Swap
          </span>
          <span
            className={cn(
              "border-b-8 border-transparent px-4 pb-2 z-10 cursor-pointer",
              currentTab === "liquidity" && "border-[#3e1444]"
            )}
            onClick={() => setCurrentTab("liquidity")}
          >
            Liquidity
          </span>
          <span
            className={cn(
              "border-b-8 border-transparent px-4 pb-2 z-10 cursor-pointer",
              currentTab === "history" && "border-[#3e1444]"
            )}
            onClick={() => setCurrentTab("history")}
          >
            History
          </span>
          <span className="bg-[#9da8c6] w-full absolute left-0 top-[30px] md:top-[37px] h-1 z-0"></span>
        </div>
        {currentTab !== "history" ? (
          <>
            <div className="flex items-center">
              <h4 className="md:text-2xl font-extrabold mx-auto uppercase">
                Balance {pacoBal ? Number(pacoBal).toFixed(3) : 0}
                <span className="ml-1">
                  {tokens && tokens.length > 0 ? token?.first?.name : ""}
                </span>
              </h4>
            </div>

            <div className="flex flex-col gap-3">
              {token.first && (
                <InputBox
                  readOnly={false}
                  name="first"
                  // value={value.first}
                  position={1}
                  selectedToken={token.first}
                  handleOnChange={handleChange}
                  handleSetPosition={handleSetPosition}
                  error={error.first}
                  balance={
                    currentTab == "swap"
                      ? allowance
                        ? allowance
                        : 0
                      : currentTab == "liquidity"
                      ? allowance1
                        ? allowance1
                        : 0
                      : 0
                  }
                  handleMaxClick={handleMaxClick}
                  isLoading={isLoading}
                />
              )}

              <SwapButton handleOnClick={handleToggleSwap} />

              {token.second && (
                <InputBox
                  readOnly={true}
                  name="second"
                  value={value.second}
                  position={2}
                  selectedToken={token.second}
                  handleOnChange={handleChange}
                  handleSetPosition={handleSetPosition}
                  error={error.second}
                  balance={
                    currentTab == "swap"
                      ? allowance
                        ? allowance
                        : 0.0
                      : currentTab == "liquidity"
                      ? allowance2
                        ? allowance2
                        : 0.0
                      : 0.0
                  }
                  isLoading={isLoading}
                />
              )}
            </div>

            <button
              onClick={
                currentTab === "swap"
                  ? isApproved
                    ? handleSwap
                    : handleApprove
                  : isApproved
                  ? handleLiquidty
                  : handleSubmit
              }
              className="self-center"
            >
              <img
                src={
                  currentTab === "swap"
                    ? isApproved
                      ? "/buttons/swap-button.png"
                      : "/buttons/approve-button.png"
                    : isApproved
                    ? "/buttons/liquidity-button.png"
                    : "/buttons/approve-button.png"
                }
                alt=""
                className="h-16 md:h-[4.6rem]"
              />
            </button>
          </>
        ) : (
          <div className="bg-[#534982] rounded-md min-h-[20rem] p-4">
            <h2 className="text-lg lg:text-xl uppercase font-extrabold text-center">
              Recent transactions
            </h2>
            <div className="mt-5 flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <p className="font-extrabold text-sm">
                  SWAP 242425 PACO FOR BNB
                </p>
                <FiArrowUpRight
                  color="#87b0b4"
                  size={20}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-1">
                <p className="font-extrabold text-sm">SWAP 1 BTC FOR PACO</p>
                <FiArrowUpRight
                  color="#87b0b4"
                  size={20}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <TokenModal
        show={openTokenModal}
        data={tokens}
        handleOnCancel={() => setOpenTokenModal(false)}
        handleSelectToken={handleSelectToken}
      />
    </div>
  );
}

export default SwapCard;
