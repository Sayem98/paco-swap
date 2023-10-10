function SelectToken({
  position,
  selectedToken,
  handleSetPosition,
  value,
  handleMaxClick,
}) {
  const { icon, name, title } = selectedToken;

  return (
    <div className="flex flex-col gap-3 py-4">
      <button
        className="flex gap-2 items-center justify-around bg-[#645ea2] rounded-full px-2 md:px-4 py-2"
        onClick={() => handleSetPosition(position)}
      >
        <img
          className="w-[20px] md:w-auto h-[20px] md:h-[40px]"
          src={icon}
          alt=""
        />
        <p className="text-sm md:text-base font-extrabold">{title}</p>
        <img src="/icons/arrow-down.svg" alt="" />
      </button>
      <p className="text-xs md:text-sm font-extrabold">
        Allowance: <span>{value}</span> {name}
        <span
          onClick={handleMaxClick}
          className="text-[#489f4d] font-bold ml-2 cursor-pointer"
        >
          MAX
        </span>
      </p>
    </div>
  );
}

export default SelectToken;
