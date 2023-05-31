import ReactDOM from "react-dom";
import ModalActionItem from "../../ModalActionItem";
import { useEffect, useRef, useState } from "react";
import ModalWrapper from "../../ModalWrapper";
import { useAppSelector } from "../../../hooks/useReduxHooks";

interface TimeOptionsProps {
  onClose: () => void;
}

const TimeOptionsOverlay = ({ onClose }: TimeOptionsProps) => {
  const timeOptionsRef = useRef<HTMLDivElement>(null);
  const [defaultHoverFirstAction, setDefaultHoverFirstAction] =
    useState<boolean>(true);
  const { timeOptionsModal } = useAppSelector((state) => state.modals);

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      const timePickerButton = document.querySelector(
        ".timePicker__button"
      ) as HTMLDivElement;

      if (
        !timeOptionsRef.current!.contains(e.target as HTMLDivElement) &&
        !timePickerButton.contains(e.target as HTMLDivElement)
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
      className="actions-modal time-options"
      style={{
        left: timeOptionsModal.coordinates.left,
        top: timeOptionsModal.coordinates.top + 30,
      }}
      ref={timeOptionsRef}
    >
      <ul>
        <ModalActionItem
          onClickHandler={() => {}}
          onMouseEnter={onMouseEnterHandlar}
          name="Morning"
          rightText="9:00 AM"
          defaultHoverFirstAction={defaultHoverFirstAction}
        />
        <ModalActionItem
          onClickHandler={() => {}}
          onMouseEnter={onMouseEnterHandlar}
          name="Noon"
          rightText="9:00 PM"
        />
        <ModalActionItem
          onClickHandler={() => {}}
          onMouseEnter={onMouseEnterHandlar}
          name="Afternoon"
          rightText="5:00 PM"
        />
        <ModalActionItem
          onClickHandler={() => {}}
          onMouseEnter={onMouseEnterHandlar}
          name="Evening"
          rightText="8:00 PM"
        />
      </ul>
    </div>
  );
};

const TimeOptionsModal = ({ onClose }: TimeOptionsProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper>
          <TimeOptionsOverlay onClose={onClose} />
        </ModalWrapper>,
        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default TimeOptionsModal;
