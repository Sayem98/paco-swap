import { useRef } from "react";
import SelectToken from "./SelectToken";

const ErrorMessage = ({ message }) => {
  return <p className="text-right -mt-3 text-[#ff0000]">{message}</p>;
};

function InputBox({
  readOnly,
  isLoading,
  name,
  value,
  position,
  selectedToken,
  handleOnChange,
  handleSetPosition,
  error,
  balance,
  handleMaxClick,
}) {
  return (
    <>
      <div
        className={`bg-[#534982] ${
          isLoading && position === 2 && "bg-[#41376d]"
        } rounded-xl overflow-hidden px-4`}
      >
        <div className="flex gap-1 md:gap-4 justify-between">
          <input
            name={name}
            className="bg-transparent outline-none w-[40%] md:w-[50%] text-2xl lg:text-3xl font-extrabold text-gray-200 self-start py-4 md:px-5"
            type="number"
            placeholder="0.0"
            value={value}
            onChange={handleOnChange}
            readOnly={readOnly}
            disabled={isLoading}
          />
          <SelectToken
            position={position}
            selectedToken={selectedToken}
            handleSetPosition={handleSetPosition}
            value={balance}
            handleMaxClick={handleMaxClick}
          />
        </div>
      </div>
      {position === 2 && isLoading && (
        <p className="text-gray-400 text-lg">Fetching current ratio</p>
      )}
    </>
  );
}

export default InputBox;
