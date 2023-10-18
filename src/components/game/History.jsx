function Item({ value, index }) {
  return (
    <div
      className={`${
        index % 2 === 0 ? "gradient-red-bg" : "gradient-green-bg"
      }  rounded-full w-[50px] h-[50px] md:w-[76px] md:h-[64px] flex justify-center items-center border border-black`}
    >
      <p className="text-white text-lg md:text-[32px] leading-normal font-bold">
        {value}
      </p>
    </div>
  );
}

const histories = [
  10, 22, 55, 25, 60, 40, 30, 50, 12, 44, 10, 22, 55, 25, 60, 10, 22, 55, 25,
  60,
];

function History() {
  return (
    <div className="flex bg-[#522c83] rounded-[29px] border border-[#522c83] px-2 py-2 relative shadow-lg h-[70px] md:h-[92px]">
      <div className="bg-[#231236c2] uppercase text-white md:text-xl font-semibold absolute top-0 left-0 h-full flex justify-center items-center px-4 md:p-6 rounded-[29px]">
        History
      </div>
      <div className="flex items-center flex-wrap flex-col gap-4 md:gap-6 w-full overflow-x-auto">
        {histories.map((value, index) => (
          <Item key={index} value={value} index={index + 1} />
        ))}
      </div>
    </div>
  );
}

export default History;
