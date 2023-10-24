import { useRef, useEffect } from "react";
import Spinner from "../Spinner";
import useGamesHistory from "../../hooks/useGamesHistory";

function Item({ value, status }) {
  return (
    <div
      className={`${
        status === "win" ? "gradient-green-bg" : "gradient-red-bg"
      } flex-shrink-0 rounded-full w-[50px] h-[50px] md:w-[60px] md:h-[54px] flex justify-center items-center border border-black`}
    >
      <p className="text-white text-lg md:text-[32px] leading-normal font-bold">
        {value}
      </p>
    </div>
  );
}

// const histories = [
//   10, 22, 55, 25, 60, 40, 30, 50, 12, 44, 10, 22, 55, 25, 60, 10, 22, 55, 25,
//   60,
// ];

function History({ reFetchHistory }) {
  const ref = useRef(null);
  const { data: histories, loading } = useGamesHistory(reFetchHistory);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [histories]);

  if (loading) return <Spinner />;

  return (
    <div className="flex bg-[#522c83] rounded-[29px] border border-[#522c83] px-2 py-2 relative shadow-lg h-[60px] md:h-[80px]">
      <div className="bg-[#231236c2] uppercase text-white md:text-lg font-semibold absolute top-0 left-0 h-full flex justify-center items-center px-4 md:p-4 rounded-[29px]">
        History
      </div>
      <div
        className="flex items-center gap-4 md:gap-6 w-full overflow-y-hidden overflow-x-auto cursor-pointer"
        ref={ref}
      >
        {histories?.map((game, index) => (
          <Item key={index} value={game.winNumber} status={game.status} />
        ))}
      </div>
    </div>
  );
}

export default History;
