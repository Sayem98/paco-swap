import Footer from "./Footer";
import GameCard from "./GameCard";
import History from "./History";
import InforCard from "./InforCard";

function DiceGame() {
  return (
    <div>
      <div className="flex flex-col gap-6 mb-32">
        <History />
        <GameCard />
        <InforCard />
      </div>
      <Footer />
    </div>
  );
}

export default DiceGame;
