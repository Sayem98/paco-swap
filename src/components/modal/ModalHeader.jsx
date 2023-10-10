function ModalHeader({ title, handleOnCancel }) {
  return (
    <div className="flex justify-between border-b-2 mx-2 rounded-t border-[#9da8c6] p-5 pb-3">
      <h3 className="uppercase text-white">{title}</h3>
      <img
        className="w-[14px] cursor-pointer"
        src="/icons/close-icon.svg"
        alt="Close"
        onClick={handleOnCancel}
      />
    </div>
  );
}

export default ModalHeader;
