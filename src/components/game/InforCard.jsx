function InforCard({
  betAmount,
  setBetAmount,
  multiplier,
  setMultiplier,
  payout,
  setPayout,
  rollType,
  setRollType,
  winChance,
}) {
  return (
    <div className="gradient-infor-card-bg rounded-[29px] border-2 border-[#491b7f61] px-4 md:px-16 py-6 relative z-50 flex flex-col gap-10 items-center">
      <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between w-full">
        <button
          className={`${
            rollType === "rollUnder"
              ? "gradient-green-bg text-white cursor-not-allowed"
              : "bg-[#834ebb] text-[#450E53]"
          } md:self-start text-xl md:text-2xl 2xl:text-2xl uppercase px-6 md:px-16 2xl:px-20 py-4 rounded-[20px] border border-[#120425] shadow-[0px_15px_8px_0px_#19032461] transition hover:-translate-y-1`}
          disabled={rollType === "rollUnder"}
          onClick={() => setRollType("rollUnder")}
        >
          Roll Under
        </button>
        <div className="shadow-[0px_12px_8px_#26042f73] text-gray-100 text-xl md:text-2xl 2xl:text-2xl flex flex-col items-center rounded-[20px] px-6 py-2">
          <span>Win Chance</span>
          <span>{winChance}%</span>
        </div>
        <button
          className={`${
            rollType === "rollOver"
              ? "gradient-green-bg text-white cursor-not-allowed"
              : "bg-[#834ebb] text-[#450E53]"
          } md:self-start text-xl md:text-2xl 2xl:text-2xl uppercase px-6 md:px-16 2xl:px-20 py-4 rounded-[20px] border border-[#120425] shadow-[0px_15px_8px_0px_#19032461] transition hover:-translate-y-1`}
          disabled={rollType === "rollOver"}
          onClick={() => setRollType("rollOver")}
        >
          Roll Over
        </button>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <h4 className="text-white text-xl uppercase">Bet Amount</h4>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full">
          <div className="flex items-center rounded-2xl border border-[#c786f2] relative w-full">
            <input
              type="number"
              className="bg-transparent focus:outline-none text-white text-2xl px-6 py-3 w-full md:w-[95%]"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
            />

            <div className="absolute top-2 right-3">
              <img src="/btc.png" alt="" className="w-9" />
            </div>
          </div>
          <div className="flex items-center gap-6 w-full">
            <div className="text-[#370843] uppercase cursor-pointer text-2xl flex items-center justify-center bg-[#8149b3] border border-[#120425] shadow-[0px_15px_8px_#19032461] rounded-[20px] w-[95px] h-[65px] transition hover:-translate-y-1">
              2x
            </div>
            <div className="text-[#370843] uppercase cursor-pointer text-2xl flex items-center justify-center bg-[#8149b3] border border-[#120425] shadow-[0px_15px_8px_#19032461] rounded-[20px] w-[95px] h-[65px] transition hover:-translate-y-1">
              1/2
            </div>
            <div className="text-[#370843] uppercase cursor-pointer text-2xl flex items-center justify-center bg-[#8149b3] border border-[#120425] shadow-[0px_15px_8px_#19032461] rounded-[20px] w-[95px] h-[65px] transition hover:-translate-y-1">
              Min
            </div>
            <div className="text-[#370843] uppercase cursor-pointer text-2xl flex items-center justify-center bg-[#8149b3] border border-[#120425] shadow-[0px_15px_8px_#19032461] rounded-[20px] w-[95px] h-[65px] transition hover:-translate-y-1">
              Max
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[90%] flex flex-col md:flex-row self-start gap-6 md:gap-20">
        <div className="flex flex-col gap-2 w-full">
          <h4 className="text-white text-xl uppercase">Multiplier</h4>
          <input
            type="text"
            className="bg-transparent focus:outline-none text-white text-2xl px-6 py-3 w-full rounded-2xl border border-[#c786f2]"
            value={multiplier}
            onChange={(e) => setMultiplier(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <h4 className="text-white text-xl uppercase">Payout</h4>
          <div className="flex items-center rounded-xl border border-[#c786f2] relative w-full">
            <input
              type="text"
              className="bg-transparent focus:outline-none text-white text-2xl px-6 py-3 w-full"
              value={payout}
              onChange={(e) => setPayout(e.target.value)}
            />

            <div className="absolute top-3 right-5">
              <img src="/dollar.png" alt="" className="w-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 pt-5">
        <button>
          <img src="/buttons/on-button.png" alt="" className="w-36" />
        </button>
        <button className="text-white text-2xl uppercase -mt-3">
          Auto bet
        </button>
      </div>
    </div>
  );
}

export default InforCard;
