import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import { CoordinatesTypes } from "../../../types/designTypes";
import ModalActionItem from "../../ModalActionItem";
import ModalWrapper from "../../ModalWrapper";
import PickDateIcon from "../../../Icons/PickDateIcon";
import DailyIcon from "../../../Icons/DailyIcon";
import WeekdaysIcon from "../../../Icons/WeekdaysIcon";
import WeeklyIcon from "../../../Icons/WeeklyIcon";
import CalendarIcon from "../../../Icons/CalendarIcon";
import YearlyIcon from "../../../Icons/YearlyIcon";
import TrashIcon2 from "../../../Icons/TrashIcon2";
import CustomRepeatModal from "../CustomRepeat";

interface RepeatOptionsProps {
  onClose: () => void;
  coordinates: CoordinatesTypes;
}

const RepeatOptions = ({ onClose, coordinates }: RepeatOptionsProps) => {
  const remindMeOptions = useRef<HTMLDivElement>(null);
  const [defaultHoverFirstAction, setDefaultHoverFirstAction] =
    useState<boolean>(true);
  const [customeHovered, setCustomHovered] = useState<boolean>(() => false);
  const [customRepeatCoordinates, setCustomRepeatCoordinates] =
    useState<CoordinatesTypes>({
      x: 0,
      y: 0,
    });
  const [timerID, setTimerID] = useState<NodeJS.Timeout>();
  const [timer2ID, setTimer2ID] = useState<NodeJS.Timeout>();

  const repeatText = "";

  // ON HOVER CUSTOM ITEM
  const onMouseEnterCustom = () => {
    // We remove the first action backgrond color
    setDefaultHoverFirstAction(false);
    const id = setTimeout(() => setCustomHovered(true), 300);
    setTimerID(id);

    // we need to set the coordinates for the custom repeat container
    const customRepeatRow = document.querySelector(
      ".custom-repeat-row"
    ) as HTMLDivElement;

    const customRepeatRowPosition = customRepeatRow.getBoundingClientRect();

    setCustomRepeatCoordinates({
      x: customRepeatRowPosition.left,
      y: customRepeatRowPosition.top,
    });
  };
  const onMouseLeaveCustom = () => clearTimeout(timerID);

  // ON HOVER OTHER ITEMS EXCEPT CUSTOM LIST
  const onMouseEnterOtherItems = () => {
    // We remove the first action background color
    setDefaultHoverFirstAction(false);

    if (customeHovered) {
      const id2 = setTimeout(() => setCustomHovered(false), 300);
      setTimer2ID(id2);
    }
  };
  const onMouseLeaveOtherItems = () => clearTimeout(timer2ID);

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      const customRepeatModal = document.querySelector(
        ".custom-repeat-modal"
      ) as HTMLDivElement;
      if (
        !remindMeOptions.current!.contains(e.target as HTMLDivElement) &&
        !customRepeatModal.contains(e.target as HTMLDivElement)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", outsideClickHandler, true);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler, true);
    };
  }, [onClose]);

  return (
    <>
      <div
        className="actions-modal"
        style={{
          left: coordinates.x,
          top: coordinates.y,
        }}
        ref={remindMeOptions}
      >
        <div className="actions-modal__header">Repeat</div>

        <ul>
          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterOtherItems}
            onMouseLeave={onMouseLeaveOtherItems}
            name="Daily"
            icon={<DailyIcon />}
            defaultHoverFirstAction={defaultHoverFirstAction}
          />

          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterOtherItems}
            onMouseLeave={onMouseLeaveOtherItems}
            name="Weekdays"
            icon={<WeekdaysIcon />}
          />

          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterOtherItems}
            onMouseLeave={onMouseLeaveOtherItems}
            name="Weekly"
            icon={<WeeklyIcon />}
          />
          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterOtherItems}
            onMouseLeave={onMouseLeaveOtherItems}
            name="Monthly"
            icon={<CalendarIcon />}
          />
          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterOtherItems}
            onMouseLeave={onMouseLeaveOtherItems}
            name="Yearly"
            icon={<YearlyIcon />}
          />

          <div className="seperator"></div>

          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterCustom}
            onMouseLeave={onMouseLeaveCustom}
            name="Custom"
            icon={<PickDateIcon />}
            rightIcon
            hovered={customeHovered}
            className="custom-repeat-row"
          />

          {repeatText && (
            <>
              <div className="seperator"></div>

              <ModalActionItem
                onClickHandler={() => {}}
                onMouseEnter={onMouseEnterOtherItems}
                onMouseLeave={onMouseLeaveOtherItems}
                name="Never repeat"
                icon={<TrashIcon2 />}
                className="delete-row"
              />
            </>
          )}
        </ul>
      </div>

      {customeHovered && (
        <CustomRepeatModal
          onClose={() => setCustomHovered(false)}
          coordinates={customRepeatCoordinates}
        />
      )}
    </>
  );
};

const RepeatOptionsModal = ({ onClose, coordinates }: RepeatOptionsProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper>
          <RepeatOptions onClose={onClose} coordinates={coordinates} />
        </ModalWrapper>,
        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default RepeatOptionsModal;
