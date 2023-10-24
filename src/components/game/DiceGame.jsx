import { useState } from "react";
import { useAccount } from "wagmi";
import Control from "./Control";
import Footer from "./Footer";
import GameCard from "./GameCard";
import History from "./History";
import InforCard from "./InforCard";
import { createGame } from "../../services/game";

function DiceGame() {
  const { address } = useAccount();
  const [prediction, setPrediction] = useState(50);
  const [result, setResult] = useState(0);
  const [betAmount, setBetAmount] = useState("");
  const [multiplier, setMultiplier] = useState("1.96X");
  const [payout, setPayout] = useState("0.00039200 BTC");
  const [rollType, setRollType] = useState("rollUnder");
  const [winChance, setWinChance] = useState(50);

  const [reFetchHistory, setReFetchHistory] = useState(false);

  async function handleRoll() {
    if (!address) return alert("Please connect your wallet first");
    if (!betAmount || !prediction || !rollType) return;

    try {
      const data = await createGame({
        playerAddress: address,
        betAmount,
        betNumber: prediction,
        rollType,
      });

      setResult(data.winNumber);
      setReFetchHistory((reFetchHistory) => !reFetchHistory);
      // alert(data.status);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-6 mb-40">
        <Control />
        <History reFetchHistory={reFetchHistory} />
        <GameCard
          prediction={prediction}
          setPrediction={setPrediction}
          result={result}
          onRoll={handleRoll}
        />
        <InforCard
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          multiplier={multiplier}
          setMultiplier={setMultiplier}
          payout={payout}
          setPayout={setPayout}
          rollType={rollType}
          setRollType={setRollType}
          winChance={winChance}
        />
      </div>
      <Footer />
    </div>
  );
}

export default DiceGame;
