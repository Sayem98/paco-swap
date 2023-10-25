import ReactSlider from "react-slider";

function GameCard({ prediction, setPrediction, result, onRoll, rollType }) {
  return (
    <div className="gradient-card-bg rounded-[29px] border-2 border-[#491b7f61] px-4 md:px-16 py-8 md:py-3 relative z-50 flex flex-col gap-16 md:gap-12 items-center">
      <div className="flex gap-2 md:gap-0 items-center justify-between w-full md:pt-2">
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="uppercase text-white text-xl">Prediction</p>
          <span className="gradient-input-bg flex justify-center items-center shadow-[0px_4px_4px_0px_#00000040] border border-[#491b7e61] rounded-lg w-[150px] h-[70px] md:w-[150px] md:h-[80px]">
            <p className="drop-shadow-[4px_8px_4px_#c235ce80] text-white text-[2.5rem] md:text-[4rem]">
              {prediction}
            </p>
          </span>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="uppercase text-white text-xl">Result</p>
          <span className="gradient-input-bg flex justify-center items-center shadow-[0px_4px_4px_0px_#00000040] border border-[#491b7e61] rounded-lg w-[150px] h-[70px] md:w-[150px] md:h-[80px]">
            <p className="drop-shadow-[4px_8px_4px_#c235ce80] text-[#67C257] text-[2.5rem] md:text-[4rem]">
              {result}
            </p>
          </span>
        </div>
      </div>

      <div className="card-bg"></div>

      {/* Slider */}
      <div className="w-full">
        <ReactSlider
          className="customSlider"
          thumbClassName="customSlider-thumb"
          trackClassName={rollType === "rollUnder" ? "roll-under" : "roll-over"}
          min={rollType == "rollUnder" ? 1 : 4}
          max={rollType == "rollUnder" ? 95 : 98}
          defaultValue={0}
          value={prediction}
          onChange={(value) => setPrediction(value)}
        />
      </div>

      {/* Button */}
      <div className="mt-5">
        <button
          onClick={onRoll}
          className="bg-[#a04cd5] transition hover:bg-[#8942b6] rounded-full text-[#430658] border-2 border-black text-xl md:text-2xl px-12 md:px-16 py-2 shadow-[0px_8px_4px_#00000040] hover:-translate-y-1"
        >
          Roll
        </button>
      </div>
    </div>
  );
}

export default GameCard;
