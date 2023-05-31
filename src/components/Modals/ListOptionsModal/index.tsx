import ReactDOM from "react-dom";
import PrintIcon from "../../../Icons/PrintIcon";
import ModalActionItem from "../../ModalActionItem";
import { useEffect, useRef, useState } from "react";
import { CoordinatesTypes } from "../../../types/designTypes";
import ModalWrapper from "../../ModalWrapper";

interface ListOptionsProps {
  onClose: () => void;
  coordinates: CoordinatesTypes;
}

const ListOptionsMenuOverlay = ({ onClose, coordinates }: ListOptionsProps) => {
  const listOptionsRef = useRef<HTMLDivElement>(null);
  const [defaultHoverFirstAction, setDefaultHoverFirstAction] =
    useState<boolean>(true);

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      const threeDotsButton = document.querySelector(
        ".list-options-tooltip-host"
      ) as HTMLDivElement;
      if (
        !listOptionsRef.current!.contains(e.target as HTMLDivElement) &&
        !threeDotsButton.contains(e.target as HTMLDivElement)
      ) {
        onClose();
      }
    };

    const hideDefaultHoverFirstAction = () => {
      setDefaultHoverFirstAction(false);
    };

    document.addEventListener("click", outsideClickHandler, true);
    document.addEventListener("mousedown", hideDefaultHoverFirstAction, true);
    return () => {
      document.removeEventListener("click", outsideClickHandler, true);
      document.addEventListener("mousedown", hideDefaultHoverFirstAction, true);
    };
  }, [onClose]);

  const onMouseEnterHandlar = () => setDefaultHoverFirstAction(false);

  return (
    <div
      className="actions-modal"
      style={{
        left: coordinates.x - 84,
        top: coordinates.y + 32,
      }}
      ref={listOptionsRef}
    >
      <div className="actions-modal__header">List options</div>
      <ul>
        <ModalActionItem
          onClickHandler={() => {}}
          onMouseEnter={onMouseEnterHandlar}
          name="Print list"
          icon={<PrintIcon />}
          defaultHoverFirstAction={defaultHoverFirstAction}
        />
      </ul>
    </div>
  );
};

const ListOptionsMenuModal = ({ onClose, coordinates }: ListOptionsProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper>
          <ListOptionsMenuOverlay onClose={onClose} coordinates={coordinates} />
        </ModalWrapper>,
        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default ListOptionsMenuModal;
