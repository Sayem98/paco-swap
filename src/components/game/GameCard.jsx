import { useState } from "react";
import ReactSlider from "react-slider";

function GameCard() {
  const [currentValue, setCurrentValue] = useState(50);
  const [result, setResult] = useState(0);

  function handleRoll() {
    const randomNumber = Math.floor(Math.random() * 99) + 1;
    setResult(randomNumber);
  }

  return (
    <div className="gradient-card-bg rounded-[29px] border-2 border-[#491b7f61] px-4 md:px-16 py-6 relative z-50 flex flex-col gap-12 items-center">
      <div className="flex flex-col md:flex-row gap-6 md:gap-0 items-center justify-between w-full md:pt-10">
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="uppercase text-white text-xl">Prediction</p>
          <span className="text-white text-[2.5rem] md:text-[3.5rem] gradient-input-bg shadow-[0px_4px_4px_0px_#00000040] border border-[#491b7e61] rounded-lg text-center w-[150px] h-[70px] md:w-[180px] md:h-[90px]">
            {currentValue}
          </span>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="uppercase text-white text-xl">Result</p>
          <span className="text-[#67C257] text-[2.5rem] md:text-[3.5rem] gradient-input-bg shadow-[0px_4px_4px_0px_#00000040] border border-[#491b7e61] rounded-lg text-center w-[150px] h-[70px] md:w-[180px] md:h-[90px]">
            {result}
          </span>
        </div>
      </div>

      <div className="card-bg"></div>

      {/* Slider */}
      <div className="w-full">
        <ReactSlider
          className="customSlider"
          thumbClassName="customSlider-thumb"
          trackClassName="customSlider-track"
          min={1}
          max={99}
          defaultValue={0}
          value={currentValue}
          onChange={(value) => setCurrentValue(value)}
        />
      </div>

      {/* Button */}
      <div className="mt-5">
        <button
          onClick={handleRoll}
          className="bg-[#a04cd5] transition hover:bg-[#8942b6] rounded-full text-[#430658] border-2 border-black text-xl md:text-2xl px-12 md:px-16 py-2 shadow-[0px_8px_4px_#00000040] hover:-translate-y-1"
        >
          Roll
        </button>
      </div>
    </div>
  );
}

export default GameCard;
