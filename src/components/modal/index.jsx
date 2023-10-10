import { createPortal } from "react-dom";

function Modal({ show, children }) {
  const portalContainer = document.getElementById("portal-root");

  if (!show) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 bg-gray-200/20 flex items-center backdrop-blur-sm justify-center z-[999999]">
      <div className="flex flex-col gap-4 bg-[#3c2f61] rounded-xl w-[22rem] md:min-w-[26rem] ">
        {children}
      </div>
    </div>,
    portalContainer
  );
}

export default Modal;
