import { useEffect, useState } from "react";
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

  useEffect(() => {
    // same logic copy pase in backend
    if (rollType === "rollUnder") {
      setWinChance(Number(prediction));
      setMultiplier((100 / Number(prediction)) * (1 - 0.02));
      setPayout(betAmount * multiplier);
    } else {
      setWinChance(100 - Number(prediction) - 1);
      setMultiplier((100 / (100 - Number(prediction) - 1)) * (1 - 0.02));
      setPayout(betAmount * multiplier);
    }
  }, [prediction, betAmount, multiplier, rollType]);

  async function handleCahngeOFRoll(type = "rollUnder") {
    setRollType(type);
    if (type === "rollUnder" && prediction > 95) {
      setPrediction(95);
    } else if (type === "rollOver" && prediction < 4) {
      setPrediction(4);
    }
  }

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
      alert(data.status);
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
          rollType={rollType}
        />
        <InforCard
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          multiplier={multiplier}
          setMultiplier={setMultiplier}
          payout={payout}
          setPayout={setPayout}
          rollType={rollType}
          setRollType={handleCahngeOFRoll}
          winChance={winChance}
        />
      </div>
      <Footer />
    </div>
  );
}

export default DiceGame;
