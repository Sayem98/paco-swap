function SearchBox({ placeholder, handleOnChange, inputRef }) {
  return (
    <div className="flex bg-[#534982] px-4 py-3 rounded-2xl">
      <img src="/icons/search-icon.svg" alt="" />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onChange={handleOnChange}
        className="bg-transparent outline-none pl-2 text-gray-200 text-base"
      />
    </div>
  );
}

export default SearchBox;
