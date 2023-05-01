import { useState } from "react";
import CircleIcon from "../../../Icons/CircleIcon";
import PlusIcon from "../../../Icons/PlusIcon";
import CalendarIcon from "../../../Icons/CalendarIcon";
import BellIcon from "../../../Icons/BellIcon";
import RepeatIcon from "../../../Icons/RepeatIcon";
import { CoordinatesTypes } from "../../../types/designTypes";
import Tooltip from "../../Tooltips/Tooltip";
import DueDateOptionsModal from "./DueDateOptions";
import RemindMeOptionsModal from "./RemindMeOptions";
import RepeatOptionsModal from "./RepeatOptions";

const DUE_DATE: string = "DUE_DATE";
const REMIND_ME: string = "REMIN_DME";
const REPEAT: string = "REPEAT";

const AddTasks = () => {
  const [inputFocused, setInputFocused] = useState<boolean>(() => false);
  const [dueDateHovered, setDueDateHovered] = useState<boolean>(false);
  const [remindMeHovered, setRemindMeHovered] = useState<boolean>(false);
  const [repeatHovered, setRepeatHovered] = useState<boolean>(false);

  const [dueDateOpen, setDueDateOpen] = useState<boolean>(false);
  const [remindMeOpen, setRemindMeOpen] = useState<boolean>(false);
  const [repeatOpen, setRepeatOpen] = useState<boolean>(false);

  const [timerID, setTimerID] = useState<NodeJS.Timeout>();
  const [tooltipHostWidth, setTooltipHostWidth] = useState<number>(0);
  const [tooltipHostWidthOnClick, setTooltipHostWidthOnClick] =
    useState<number>(0);
  const [tooltipCoordinates, setTooltipCoordinates] =
    useState<CoordinatesTypes>({ x: 0, y: 0 });
  const [modalCoordinates, setModalCoordinates] = useState<CoordinatesTypes>({
    x: 0,
    y: 0,
  });

  const [taskText, setTaskText] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [remindTime, setRemindTime] = useState<string>("");
  const [repeatDay, setRepeatDay] = useState<string>("");

  const onMouseEnterHandler = (type: string) => {
    const tooltipHostClassname =
      type === DUE_DATE
        ? ".due-date-tooltip-host"
        : type === REMIND_ME
        ? ".remind-me-tooltip-host"
        : ".repeat-tooltip-host";

    const tooltipHost = document.querySelector(
      tooltipHostClassname
    ) as HTMLDivElement;

    setTooltipHostWidth(tooltipHost.offsetWidth);

    const searchTooltipPosition = tooltipHost.getBoundingClientRect();
    setTooltipCoordinates({
      x: searchTooltipPosition.left,
      y: searchTooltipPosition.top,
    });

    switch (type) {
      case DUE_DATE:
        const id = setTimeout(() => setDueDateHovered(true), 300);
        setTimerID(id);
        break;
      case REMIND_ME:
        const id2 = setTimeout(() => setRemindMeHovered(true), 300);
        setTimerID(id2);
        break;
      case REPEAT:
        const id3 = setTimeout(() => setRepeatHovered(true), 300);
        setTimerID(id3);
        break;
    }
  };

  const onMouseLeaveHandler = (type: string) => {
    clearTimeout(timerID);

    switch (type) {
      case DUE_DATE:
        setDueDateHovered(false);
        break;
      case REMIND_ME:
        setRemindMeHovered(false);
        break;
      case REPEAT:
        setRepeatHovered(false);
        break;
    }
  };

  const onBtnOpenHandler = (type: string) => {
    clearTimeout(timerID);
    const tooltipHostClassname =
      type === DUE_DATE
        ? ".due-date-tooltip-host"
        : type === REMIND_ME
        ? ".remind-me-tooltip-host"
        : ".repeat-tooltip-host";

    const tooltipHost = document.querySelector(
      tooltipHostClassname
    ) as HTMLDivElement;

    setTooltipHostWidthOnClick(tooltipHost.offsetWidth);

    const tooltipHostPosition = tooltipHost.getBoundingClientRect();
    setModalCoordinates({
      x: tooltipHostPosition.left,
      y: tooltipHostPosition.top,
    });

    switch (type) {
      case DUE_DATE:
        setDueDateOpen(true);
        break;
      case REMIND_ME:
        setRemindMeOpen(true);
        break;
      case REPEAT:
        setRepeatOpen(true);
        break;
    }
  };

  return (
    <>
      <div className="add-tasks">
        <div className="add-tasks__top">
          <button>{inputFocused ? <CircleIcon /> : <PlusIcon />}</button>
          <input
            type="text"
            placeholder="Add a task"
            onFocus={() => setInputFocused(true)}
            onChange={(e) => setTaskText(e.target.value)}
          />
        </div>

        <div
          className={`add-tasks__bottom${inputFocused ? " input-focused" : ""}`}
        >
          <div className="add-tasks__additional">
            <div className="due-date-tooltip-host">
              <button
                onMouseEnter={onMouseEnterHandler.bind(this, DUE_DATE)}
                onMouseLeave={onMouseLeaveHandler.bind(this, DUE_DATE)}
                onClick={onBtnOpenHandler.bind(this, DUE_DATE)}
              >
                <div
                  className={`addingTask-container${
                    dueDate ? " additional-text-added" : ""
                  }`}
                >
                  <CalendarIcon />
                  {dueDate && (
                    <div className="additional-text">
                      <span>{dueDate}</span>
                    </div>
                  )}
                </div>
              </button>
            </div>

            <div className="remind-me-tooltip-host">
              <button
                onMouseEnter={onMouseEnterHandler.bind(this, REMIND_ME)}
                onMouseLeave={onMouseLeaveHandler.bind(this, REMIND_ME)}
                onClick={onBtnOpenHandler.bind(this, REMIND_ME)}
              >
                <div
                  className={`addingTask-container${
                    remindTime ? " additional-text-added" : ""
                  }`}
                >
                  <BellIcon />
                  {remindTime && (
                    <div className="additional-text">
                      <span>{remindTime}</span>
                    </div>
                  )}
                </div>
              </button>
            </div>

            <div className="repeat-tooltip-host">
              <button
                onMouseEnter={onMouseEnterHandler.bind(this, REPEAT)}
                onMouseLeave={onMouseLeaveHandler.bind(this, REPEAT)}
                onClick={onBtnOpenHandler.bind(this, REPEAT)}
              >
                <div
                  className={`addingTask-container${
                    repeatDay ? " additional-text-added" : ""
                  }`}
                >
                  <RepeatIcon />
                  {repeatDay && (
                    <div className="additional-text">
                      <span>{repeatDay}</span>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>

          <button
            className={`add-tasks__addBtn${!taskText ? " addBtnDisabled" : ""}`}
            children="Add"
          />
        </div>
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

      {dueDateOpen && (
        <DueDateOptionsModal
          onClose={() => {
            setDueDateOpen(false);
            setDueDateHovered(false);
          }}
          coordinates={{
            x: modalCoordinates.x - (100 - tooltipHostWidthOnClick / 2),
            y: modalCoordinates.y + 28,
          }}
        />
      )}

      {remindMeOpen && (
        <RemindMeOptionsModal
          onClose={() => {
            setRemindMeOpen(false);
            setRemindMeHovered(false);
          }}
          coordinates={{
            x: modalCoordinates.x - (111.5 - tooltipHostWidthOnClick / 2),
            y: modalCoordinates.y + 28,
          }}
        />
      )}

      {repeatOpen && (
        <RepeatOptionsModal
          onClose={() => {
            setRepeatOpen(false);
            setRepeatHovered(false);
          }}
          coordinates={{
            x: modalCoordinates.x - (100 - tooltipHostWidthOnClick / 2),
            y: modalCoordinates.y + 28,
          }}
        />
      )}
    </>
  );
};

export default AddTasks;
