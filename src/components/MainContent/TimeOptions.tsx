import ReactDOM from "react-dom";
import ModalActionItem from "../ModalActionItem";
import { useEffect, useRef, useState } from "react";
import { CoordinatesTypes } from "../../types/designTypes";
import ModalWrapper from "../ModalWrapper";

interface TimeOptionsProps {
  onClose: () => void;
  coordinates: CoordinatesTypes;
}

const TimeOptionsMenuOverlay = ({ onClose, coordinates }: TimeOptionsProps) => {
  const timeOptionsRef = useRef<HTMLDivElement>(null);
  const [defaultHoverFirstAction, setDefaultHoverFirstAction] =
    useState<boolean>(true);

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
        left: coordinates.x,
        top: coordinates.y + 30,
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

const TimeOptionsModal = ({ onClose, coordinates }: TimeOptionsProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper>
          <TimeOptionsMenuOverlay onClose={onClose} coordinates={coordinates} />
        </ModalWrapper>,
        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default TimeOptionsModal;
