import { useState } from "react";
import { CoordinatesTypes } from "../../types/designTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import CalendarIcon from "../../Icons/CalendarIcon";
import BellIcon from "../../Icons/BellIcon";
import RepeatIcon from "../../Icons/RepeatIcon";
import {
  deuDateModalToggle,
  reminderModalToggle,
  repeatModalToggle,
} from "../../store/action-creators/modalsActions";
import HelperButton from "./HelperButton";
import Tooltip from "../Tooltip/Tooltip";
import DueDateModal from "../Modals/DueDateModal";
import RemindMeModal from "../Modals/RemindMeModal";
import RepeatModal from "../Modals/RepeatModal";
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
  const { dueDateModal, reminderModal, repeatModal } = useAppSelector(
    (state) => state.modals
  );

  ////////////////////////////////////////////////////////////////
  const [dueDateHovered, setDueDateHovered] = useState<boolean>(false);
  const [remindMeHovered, setRemindMeHovered] = useState<boolean>(false);
  const [repeatHovered, setRepeatHovered] = useState<boolean>(false);
  const [timerID, setTimerID] = useState<NodeJS.Timeout>();
  const [tooltipHostWidth, setTooltipHostWidth] = useState<number>(0);
  const [tooltipCoordinates, setTooltipCoordinates] =
    useState<CoordinatesTypes>({ x: 0, y: 0 });

  const [dueDate, setDueDate] = useState<string>("");
  const [remindTime, setRemindTime] = useState<string>("");
  const [repeatDay, setRepeatDay] = useState<string>("");

  const onMouseEnterHandler = (type: string) => {
    onMouseEnterHelperFn(
      type,
      setTooltipHostWidth,
      setTooltipCoordinates,
      setDueDateHovered,
      setRemindMeHovered,
      setRepeatHovered,
      setTimerID
    );
  };

  const onMouseLeaveHandler = (type: string) => {
    onMouseLeaveHelperFn(
      type,
      timerID,
      setDueDateHovered,
      setRemindMeHovered,
      setRepeatHovered
    );
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

      {/* TOOLTIPS */}
      {dueDateHovered && (
        <Tooltip
          content="Add due date"
          tooltipPosition={{
            x: tooltipCoordinates.x - (44.5 - tooltipHostWidth / 2),
            y: tooltipCoordinates.y + 39,
          }}
          trianglePosition={{
            left: "36.5px",
            top: "-8px",
          }}
        />
      )}

      {remindMeHovered && (
        <Tooltip
          content="Remind me"
          tooltipPosition={{
            x: tooltipCoordinates.x - (39 - tooltipHostWidth / 2),
            y: tooltipCoordinates.y + 39,
          }}
          trianglePosition={{
            left: "31px",
            top: "-8px",
          }}
        />
      )}

      {repeatHovered && (
        <Tooltip
          content="Repeat"
          tooltipPosition={{
            x: tooltipCoordinates.x - (27.5 - tooltipHostWidth / 2),
            y: tooltipCoordinates.y + 39,
          }}
          trianglePosition={{
            left: "19.5px",
            top: "-8px",
          }}
        />
      )}

      {/* MODALS */}
      {dueDateModal.open && (
        <DueDateModal
          onClose={() => {
            dispatch(deuDateModalToggle(false));
            setDueDateHovered(false);
          }}
        />
      )}

      {reminderModal.open && (
        <RemindMeModal
          onClose={() => {
            dispatch(reminderModalToggle(false));
            setRemindMeHovered(false);
          }}
        />
      )}

      {repeatModal.open && (
        <RepeatModal
          onClose={() => {
            dispatch(repeatModalToggle(false));
            setRepeatHovered(false);
          }}
        />
      )}
    </>
  );
};

export default AddTasksBottom;
