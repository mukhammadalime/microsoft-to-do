import ReactDOM from "react-dom";
import { CoordinatesTypes } from "../../types/designTypes";
import ModalWrapper from "../ModalWrapper";
import { useEffect, useRef, useState } from "react";
import ArrowUpIcon from "../../Icons/ArrowUpIcon";
import ArrowDownIcon from "../../Icons/ArrowDownIcon";
import { v4 as uuidv4 } from "uuid";
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  isSameDay,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isToday,
} from "date-fns";
import ChevronRightIcon from "../../Icons/ChevronRightIcon";
import TimeOptionsModal from "./TimeOptions";

interface CalendarProps {
  onClose: () => void;
  coordinates: CoordinatesTypes;
  time?: boolean;
}

const CalendarOverlay = ({ onClose, coordinates, time }: CalendarProps) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<number | Date>(new Date());
  const [timeOptionsOpen, setTimeOptionsOpen] = useState<boolean>(false);
  const [timeOptionsCoordinates, setTimeOptionsCoordinates] =
    useState<CoordinatesTypes>({
      x: 0,
      y: 0,
    });

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
    setTimeOptionsOpen((prevState) => !prevState);

    const tooltipHost = document.querySelector(
      ".timePicker__input"
    ) as HTMLDivElement;

    const searchTooltipPosition = tooltipHost.getBoundingClientRect();
    setTimeOptionsCoordinates({
      x: searchTooltipPosition.left,
      y: searchTooltipPosition.top,
    });
  };

  const renderWeekdays = () => {
    const dateFormat = "EEEEEE";
    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(<th key={i}>{format(addDays(startDate, i), dateFormat)}</th>);
    }

    return <tr>{days}</tr>;
  };

  const renderDates = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <td
            className={`${
              !isSameMonth(day, monthStart) ? "not-in-current-month" : ""
            } ${isSameDay(day, selectedDate) ? "picked-day" : ""} ${
              isToday(day) ? "today" : ""
            }`}
            key={uuidv4()}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <button>
              <span>{formattedDate}</span>
            </button>
          </td>
        );
        day = addDays(day, 1);
      }
      rows.push(<tr key={uuidv4()}>{days}</tr>);
      days = [];
    }
    return <tbody>{rows}</tbody>;
  };

  return (
    <>
      <div
        className="calendar"
        style={{
          left: coordinates.x,
          top: coordinates.y + 11,
        }}
        ref={calendarRef}
      >
        <div
          className="triangle"
          style={{ left: "102.5px", top: "-8px" }}
        ></div>
        <div className="layer-box"></div>

        <div className="calendar__mainWrapper">
          <div className="calendar__main">
            <div className="calendar-controlsWrapper">
              <div className="datePicker">
                <div className="datePicker__header">
                  <div className="datePicker__header--monthYear">
                    {format(currentMonth, "MMMM yyyy")}
                  </div>
                  <div className="datePicker__header--arrows">
                    <button
                      onClick={() =>
                        setCurrentMonth(subMonths(currentMonth, 1))
                      }
                    >
                      <ArrowUpIcon />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentMonth(addMonths(currentMonth, 1))
                      }
                    >
                      <ArrowDownIcon />
                    </button>
                  </div>
                </div>

                <div className="datePicker__main">
                  <table>
                    <thead>{renderWeekdays()}</thead>
                    {renderDates()}
                  </table>
                </div>
              </div>
            </div>
            {time && (
              <div className="timePicker">
                <div className="timePicker__input">
                  <div className="timePicker__time">
                    <input
                      pattern="^[0-12]"
                      type="text"
                      defaultValue={("0" + new Date().getHours()).slice(-2)}
                      maxLength={2}
                    />
                    :
                    <input
                      pattern="^[ء-ي٠-٩-१-९-०-९-\d]{1,2}"
                      type="text"
                      defaultValue={("0" + new Date().getMinutes()).slice(-2)}
                      maxLength={2}
                    />
                  </div>
                  <button
                    className="timePicker__button"
                    onClick={onOpenTimeOptionsHandler}
                  >
                    <ChevronRightIcon />
                  </button>
                </div>

                <div className="timePicker__ampm">
                  <select>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
            )}
            <button className="calendar-save btn-blue">
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      {timeOptionsOpen && (
        <TimeOptionsModal
          onClose={() => setTimeOptionsOpen(false)}
          coordinates={timeOptionsCoordinates}
        />
      )}
    </>
  );
};

const CalendarModal = ({ onClose, coordinates, time }: CalendarProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper>
          <CalendarOverlay
            onClose={onClose}
            coordinates={coordinates}
            time={time}
          />
        </ModalWrapper>,
        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default CalendarModal;
