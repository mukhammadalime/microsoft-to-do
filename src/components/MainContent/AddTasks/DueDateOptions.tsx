import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import { CoordinatesTypes } from "../../../types/designTypes";
import ModalActionItem from "../../ModalActionItem";
import DueTodayIcon from "../../../Icons/DueTodayIcon";
import ModalWrapper from "../../ModalWrapper";
import RemoveIcon from "../../../Icons/RemoveIcon";
import NextWeekIcon from "../../../Icons/NextWeekIcon";
import PickDateIcon from "../../../Icons/PickDateIcon";
import TrashIcon2 from "../../../Icons/TrashIcon2";
import CalendarModal from "../Calendar";

interface DueDateOptionsProps {
  onClose: () => void;
  coordinates: CoordinatesTypes;
}

const DueDateOptions = ({ onClose, coordinates }: DueDateOptionsProps) => {
  const dueDateOptionsRef = useRef<HTMLDivElement>(null);
  const [defaultHoverFirstAction, setDefaultHoverFirstAction] =
    useState<boolean>(true);
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  const dueDateText = "s";

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      if (!dueDateOptionsRef.current!.contains(e.target as HTMLDivElement)) {
        // onClose();
      }
    };

    document.addEventListener("mousedown", outsideClickHandler, true);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler, true);
    };
  }, [onClose]);

  const onMouseEnterHandlar = () => setDefaultHoverFirstAction(false);

  return (
    <>
      <div
        className="actions-modal"
        style={{
          left: coordinates.x,
          top: coordinates.y,
          display: calendarOpen ? "none" : "unset",
        }}
        ref={dueDateOptionsRef}
      >
        <div className="actions-modal__header">Due</div>
        <ul>
          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterHandlar}
            name="Today"
            icon={<DueTodayIcon />}
            defaultHoverFirstAction={defaultHoverFirstAction}
            rightText="Mon"
          />

          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterHandlar}
            name="Tomorrow"
            icon={<RemoveIcon />}
            rightText="Tue"
          />

          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterHandlar}
            name="Next week"
            icon={<NextWeekIcon />}
            rightText="Mon"
          />

          <div className="seperator"></div>

          <ModalActionItem
            onClickHandler={() => {
              setCalendarOpen(true);
            }}
            onMouseEnter={onMouseEnterHandlar}
            name="Pick a date"
            icon={<PickDateIcon />}
          />

          {dueDateText && (
            <>
              <div className="seperator"></div>

              <ModalActionItem
                onClickHandler={() => {}}
                onMouseEnter={onMouseEnterHandlar}
                name="Remove due date"
                icon={<TrashIcon2 />}
                className="delete-row"
              />
            </>
          )}
        </ul>
      </div>

      {calendarOpen && (
        <CalendarModal
          onClose={() => setCalendarOpen(false)}
          coordinates={coordinates}
        />
      )}
    </>
  );
};

const DueDateOptionsModal = ({ onClose, coordinates }: DueDateOptionsProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper>
          <DueDateOptions onClose={onClose} coordinates={coordinates} />
        </ModalWrapper>,
        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default DueDateOptionsModal;
