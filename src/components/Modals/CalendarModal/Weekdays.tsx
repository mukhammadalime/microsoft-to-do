import { addDays, format, startOfWeek } from "date-fns";

const Weekdays = ({ currentMonth }: { currentMonth: Date }) => {
  const renderWeekdays = () => {
    const dateFormat = "EEEEEE";
    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(<th key={i}>{format(addDays(startDate, i), dateFormat)}</th>);
    }

    return <tr>{days}</tr>;
  };

  return renderWeekdays();
};

export default Weekdays;
