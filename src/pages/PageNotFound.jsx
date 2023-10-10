function PageNotFound() {
  return (
    <div className="flex justify-center items-center bg-[#3c2f61] h-full text-white px-7 py-7 shadow-2xl rounded-3xl w-full">
      <div className="flex flex-col text-center">
        <h1 className="text-4xl uppercase font-semibold mt-4">
          Page Not Found!
        </h1>
        <p className="text-gray-200 mt-2">This page doesn't exists!</p>
      </div>
    </div>
  );
}

export default PageNotFound;
