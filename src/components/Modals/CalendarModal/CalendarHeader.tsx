import ArrowUpIcon from "../../../Icons/ArrowUpIcon";
import ArrowDownIcon from "../../../Icons/ArrowDownIcon";
import { addMonths, format, subMonths } from "date-fns";

const CalendarHeader = ({
  currentMonth,
  setCurrentMonth,
}: {
  currentMonth: Date;
  setCurrentMonth: (month: Date) => void;
}) => {
  return (
    <div className="datePicker__header">
      <div className="datePicker__header--monthYear">
        {format(currentMonth, "MMMM yyyy")}
      </div>
      <div className="datePicker__header--arrows">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          <ArrowUpIcon />
        </button>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          <ArrowDownIcon />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
