import { useState } from "react";
import { useAppDispatch } from "../../hooks/useReduxHooks";
import CalendarIcon from "../../Icons/CalendarIcon";
import BellIcon from "../../Icons/BellIcon";
import RepeatIcon from "../../Icons/RepeatIcon";
import HelperButton from "./HelperButton";
import {
  DUE_DATE,
  REMIND_ME,
  REPEAT,
  onBtnOpenHelperFn,
  onMouseEnterHelperFn,
  onMouseLeaveHelperFn,
} from "./helperFunctions";

const AddTasksBottom = ({
  inputFocused,
  taskText,
}: {
  inputFocused: boolean;
  taskText: string;
}) => {
  /// REDUX
  const dispatch: any = useAppDispatch();

  ////////////////////////////////////////////////////////////////
  const [timerID, setTimerID] = useState<NodeJS.Timeout>();

  const [dueDate, setDueDate] = useState<string>("");
  const [remindTime, setRemindTime] = useState<string>("");
  const [repeatDay, setRepeatDay] = useState<string>("");

  const onMouseEnterHandler = (type: string) => {
    onMouseEnterHelperFn(type, setTimerID, dispatch);
  };

  const onMouseLeaveHandler = (type: string) => {
    onMouseLeaveHelperFn(type, timerID, dispatch);
  };

  const onBtnOpenHandler = (type: string) => {
    onBtnOpenHelperFn(type, timerID, dispatch);
  };

  return (
    <>
      <div
        className={`add-tasks__bottom${inputFocused ? " input-focused" : ""}`}
      >
        <div className="add-tasks__additional">
          <HelperButton
            className="due-date-tooltip-host"
            onMouseEnter={onMouseEnterHandler.bind(this, DUE_DATE)}
            onMouseLeave={onMouseLeaveHandler.bind(this, DUE_DATE)}
            onClick={onBtnOpenHandler.bind(this, DUE_DATE)}
            additionalText={dueDate}
            icon={<CalendarIcon />}
          />

          <HelperButton
            className="remind-me-tooltip-host"
            onMouseEnter={onMouseEnterHandler.bind(this, REMIND_ME)}
            onMouseLeave={onMouseLeaveHandler.bind(this, REMIND_ME)}
            onClick={onBtnOpenHandler.bind(this, REMIND_ME)}
            additionalText={remindTime}
            icon={<BellIcon />}
          />

          <HelperButton
            className="repeat-tooltip-host"
            onMouseEnter={onMouseEnterHandler.bind(this, REPEAT)}
            onMouseLeave={onMouseLeaveHandler.bind(this, REPEAT)}
            onClick={onBtnOpenHandler.bind(this, REPEAT)}
            additionalText={repeatDay}
            icon={<RepeatIcon />}
          />
        </div>

        <button
          className={`add-tasks__addBtn${!taskText ? " addBtnDisabled" : ""}`}
          children="Add"
        />
      </div>
    </>
  );
};

export default AddTasksBottom;
