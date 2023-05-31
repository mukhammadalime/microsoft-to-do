import ReactDOM from "react-dom";
import PrintIcon from "../../../Icons/PrintIcon";
import ModalActionItem from "../../ModalActionItem";
import { useEffect, useRef, useState } from "react";
import ModalWrapper from "../../ModalWrapper";
import { useAppSelector } from "../../../hooks/useReduxHooks";

interface ListOptionsProps {
  onClose: () => void;
}

const ListOptionsMenuOverlay = ({ onClose }: ListOptionsProps) => {
  const listOptionsRef = useRef<HTMLDivElement>(null);
  const [defaultHoverFirstAction, setDefaultHoverFirstAction] =
    useState<boolean>(true);

  const { listOptionsModal } = useAppSelector((state) => state.modals);

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
        left: listOptionsModal.coordinates.left - 84,
        top: listOptionsModal.coordinates.top + 32,
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

const ListOptionsMenuModal = ({ onClose }: ListOptionsProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper>
          <ListOptionsMenuOverlay onClose={onClose} />
        </ModalWrapper>,
        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default ListOptionsMenuModal;
