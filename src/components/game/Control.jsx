function Control() {
  return (
    <div className="bg-[#592a8a] shadow-[0px_4px_4px_0px_#00000040] flex md:flex-col justify-center md:justify-center md:absolute md:top-[24rem] 2xl:top-[24rem] right-2 2xl:right-[2rem] space-x-6 md:space-x-0 md:space-y-3 rounded-3xl px-2 py-1 md:py-4">
      <img
        src="/icons/volume.png"
        alt=""
        className="w-10 md:w-12 cursor-pointer transition hover:scale-110"
      />
      <img
        src="/icons/rocket.png"
        alt=""
        className="w-10 md:w-12 cursor-pointer transition hover:scale-110"
      />
      <img
        src="/icons/help.png"
        alt=""
        className="w-10 md:w-12 cursor-pointer transition hover:scale-110"
      />
    </div>
  );
}

export default Control;
