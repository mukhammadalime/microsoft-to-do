import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import { CoordinatesTypes } from "../../../types/designTypes";
import ModalActionItem from "../../ModalActionItem";
import ModalWrapper from "../../ModalWrapper";
import PickDateIcon from "../../../Icons/PickDateIcon";
import ClockArrowDownIcon from "../../../Icons/ClockArrowDownIcon";
import ClockOneArrowRightIcon from "../../../Icons/ClockOneArrowRightIcon";
import ClockTwoArrowsRightIcon from "../../../Icons/ClockTwoArrowsRightIcon";
import TrashIcon2 from "../../../Icons/TrashIcon2";
import CalendarModal from "../Calendar";

interface RemindMeOptionsProps {
  onClose: () => void;
  coordinates: CoordinatesTypes;
}

const RemindMeOptions = ({ onClose, coordinates }: RemindMeOptionsProps) => {
  const remindMeOptions = useRef<HTMLDivElement>(null);
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [defaultHoverFirstAction, setDefaultHoverFirstAction] =
    useState<boolean>(true);

  const remindMeText = "2";
  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      if (!remindMeOptions.current!.contains(e.target as HTMLDivElement)) {
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
        ref={remindMeOptions}
      >
        <div className="actions-modal__header">Reminder</div>

        <ul>
          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterHandlar}
            name="Later today"
            icon={<ClockArrowDownIcon />}
            defaultHoverFirstAction={defaultHoverFirstAction}
            rightText="5:00 AM"
          />

          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterHandlar}
            name="Tomorrow"
            icon={<ClockOneArrowRightIcon />}
            rightText="Tue, 9 AM"
          />

          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterHandlar}
            name="Next week"
            icon={<ClockTwoArrowsRightIcon />}
            rightText="Mon, 9 AM"
          />

          <div className="seperator"></div>

          <ModalActionItem
            onClickHandler={() => setCalendarOpen(true)}
            onMouseEnter={onMouseEnterHandlar}
            name="Pick a date & time"
            icon={<PickDateIcon />}
          />

          {remindMeText && (
            <>
              <div className="seperator"></div>

              <ModalActionItem
                onClickHandler={() => {}}
                onMouseEnter={onMouseEnterHandlar}
                name="Remove reminder"
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
          time
        />
      )}
    </>
  );
};

const RemindMeOptionsModal = ({
  onClose,
  coordinates,
}: RemindMeOptionsProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper>
          <RemindMeOptions onClose={onClose} coordinates={coordinates} />
        </ModalWrapper>,
        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default RemindMeOptionsModal;
