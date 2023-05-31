import ChevronRightIcon from "../../../Icons/ChevronRightIcon";

const TimePicker = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <div className="timePicker">
      <div className="timePicker__input">
        <div className="timePicker__time">
          <input
            pattern=""
            type="text"
            defaultValue={("0" + new Date().getHours()).slice(-2)}
            maxLength={2}
          />
          :
          <input
            pattern=""
            type="text"
            defaultValue={("0" + new Date().getMinutes()).slice(-2)}
            maxLength={2}
          />
        </div>
        <button
          className="timePicker__button"
          onClick={onClickHandler}
          children={<ChevronRightIcon />}
        />
      </div>

      <div className="timePicker__ampm">
        <select>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  );
};

export default TimePicker;
