import ReactDOM from "react-dom";
import ModalWrapper from "../../ModalWrapper";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";
import TimePicker from "./TimePicker";
import CalendarHeader from "./CalendarHeader";
import Weekdays from "./Weekdays";
import MonthDates from "./MonthDates";
import { timeOptionsModalToggle } from "../../../store/action-creators/modalsActions";

interface CalendarProps {
  onClose: () => void;
  time?: boolean;
}

const CalendarOverlay = ({ onClose, time }: CalendarProps) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<number | Date>(new Date());

  const dispatch = useAppDispatch();
  const { calendarModal, timeOptionsModal } = useAppSelector(
    (state) => state.modals
  );

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      const timeOptions = document.querySelector(
        ".time-options"
      ) as HTMLDivElement;

      if (
        !calendarRef.current!.contains(e.target as HTMLDivElement) &&
        !timeOptions?.contains(e.target as HTMLDivElement)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", outsideClickHandler, true);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler, true);
    };
  }, [onClose]);

  const onOpenTimeOptionsHandler = () => {
    const tooltipHost = document.querySelector(
      ".timePicker__input"
    ) as HTMLDivElement;

    const searchTooltipPosition = tooltipHost.getBoundingClientRect();

    const coordinates = {
      x: searchTooltipPosition.left,
      y: searchTooltipPosition.top,
    };

    dispatch(timeOptionsModalToggle(!timeOptionsModal.open, coordinates));
  };

  return (
    <div
      className="calendar"
      style={{
        left: calendarModal.coordinates.x - 10.5 ?? 0,
        top: calendarModal.coordinates.y + 11 ?? 0,
      }}
      ref={calendarRef}
    >
      <div className="triangle" style={{ left: "102.5px", top: "-8px" }} />
      <div className="layer-box" />

      <div className="calendar__mainWrapper">
        <div className="calendar__main">
          <div className="calendar-controlsWrapper">
            <div className="datePicker">
              <CalendarHeader
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
              />

              <div className="datePicker__main">
                <table>
                  <thead>
                    <Weekdays currentMonth={currentMonth} />
                  </thead>
                  <MonthDates
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                </table>
              </div>
            </div>
          </div>
          {time && <TimePicker onClickHandler={onOpenTimeOptionsHandler} />}
          <button className="calendar-save btn-blue">
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const CalendarModal = ({ onClose, time }: CalendarProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper>
          <CalendarOverlay onClose={onClose} time={time} />
        </ModalWrapper>,
        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default CalendarModal;
