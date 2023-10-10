function SwapButton({ handleOnClick }) {
  return (
    <div
      className="-my-6 ml-6 flex justify-center items-center bg-[#675bfb] w-[38px] h-[38px] rounded-full z-10 cursor-pointer"
      onClick={handleOnClick}
    >
      <img src="/icons/swap.def.svg" alt="" />
    </div>
  );
}

export default SwapButton;
