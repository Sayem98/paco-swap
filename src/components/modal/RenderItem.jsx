function RenderItem({ item, handleSelectToken }) {
  const { title, name, icon } = item;

  return (
    <div
      className="flex items-center gap-4 hover:bg-[#534982] transition-all hover:cursor-pointer px-3 py-2 rounded-xl"
      onClick={() => handleSelectToken(item)}
    >
      <img className="w-[30px] h-[30px]" src={icon} alt="" />
      <div className="flex flex-col">
        <p className="text-white font-bold">{title}</p>
        <small className="text-xs text-gray-300">{name}</small>
      </div>
    </div>
  );
}

export default RenderItem;
