import { useState, useEffect, useRef } from "react";
import RenderItem from "./RenderItem";
import ModalHeader from "./ModalHeader";
import SearchBox from "./SearchBox";
import ModalBody from "./ModalBody";
import Modal from "./index";

function TokenModal({ show, handleOnCancel, handleSelectToken, data }) {
  const didMount = useRef(false);
  const inputRef = useRef("");
  const [tokens, setTokens] = useState(data);

  // Reset search result after close modal and clear input text
  useEffect(() => {
    if (didMount.current && !show) {
      setTokens(data);
      if (inputRef.current) inputRef.current.value = "";
    } else {
      // Automatic focus search input
      if (show) inputRef?.current.focus();
      didMount.current = true;
    }
  }, [show, data]);

  const handleChange = (e) => {
    const { value } = e.target;
    const searchToken = tokens?.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    // Show all token data if user clear search input
    value ? setTokens(searchToken) : setTokens(data);
  };

  return (
    <Modal show={show}>
      <ModalHeader title="SELECT A TOKEN" handleOnCancel={handleOnCancel} />
      <ModalBody>
        <SearchBox
          placeholder="Search name..."
          handleOnChange={handleChange}
          inputRef={inputRef}
        />
        <div className="mt-4 flex flex-col gap-1 h-[300px] overflow-y-scroll">
          {tokens?.map((token, i) => (
            <RenderItem
              key={i}
              item={token}
              handleSelectToken={handleSelectToken}
            />
          ))}
        </div>
      </ModalBody>
    </Modal>
  );
}

export default TokenModal;
