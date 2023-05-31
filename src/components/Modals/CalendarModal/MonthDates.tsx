import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { v4 as uuidv4 } from "uuid";

const MonthDates = ({
  currentMonth,
  selectedDate,
  setSelectedDate,
}: {
  currentMonth: Date;
  selectedDate: number | Date;
  setSelectedDate: (day: Date) => void;
}) => {
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

  return renderDates();
};

export default MonthDates;
