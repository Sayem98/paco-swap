const ComingSoon = () => {
  return (
    <div className="flex justify-center md:bg-[#3c2f61] h-[32rem] md:h-full text-white px-7 py-7 shadow-2xl  md:rounded-3xl w-full">
      <div className="flex flex-col text-center mx-6 md:mt-24">
        <img src="/logo.png" alt="" className="h-48 object-contain" />
        <h1 className="text-4xl uppercase font-semibold mt-4">Coming Soon!</h1>
        <p className="text-gray-200 mt-2">
          We're working on something exciting. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
