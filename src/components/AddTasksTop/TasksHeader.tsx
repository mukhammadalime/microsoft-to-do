import { ReactElement, useState } from "react";
import SunIcon from "../../Icons/SunIcon";
import ThreeDotsIcon from "../../Icons/ThreeDotsIcon";
import SortIcon from "../../Icons/SortIcon";
import LampIcon from "../../Icons/LampIcon";
import { CoordinatesTypes } from "../../types/designTypes";
import {
  LIST_OPTIONS,
  SORT,
  SUGGESTIONS,
  onMouseEnterHelperFn,
  onMouseLeaveHelperFn,
} from "./helperFunctions";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { listOptionsModalToggler } from "../../store/reducers/modalsReducer";
import { listOptionsTooltipToggler } from "../../store/reducers/tooltipsReducer";

const TasksHeader = () => {
  /// REDUX
  const dispatch = useAppDispatch();
  const { listOptionsModal } = useAppSelector((state) => state.modals);
  const [timerID, setTimerID] = useState<NodeJS.Timeout>();
  const [tooltipCoordinates, setTooltipCoordinates] =
    useState<CoordinatesTypes>({ left: 0, top: 0 });

  const onMouseEnterHandler = (type: string) => {
    onMouseEnterHelperFn(type, setTimerID, setTooltipCoordinates, dispatch);
  };

  const onMouseLeaveHandler = (type: string) => {
    onMouseLeaveHelperFn(type, timerID, dispatch);
  };

  const onClickListOptions = () => {
    dispatch(
      listOptionsModalToggler({
        open: !listOptionsModal.open,
        coordinates: {
          left: tooltipCoordinates.left,
          top: tooltipCoordinates.top,
        },
      })
    );

    !listOptionsModal.open &&
      dispatch(listOptionsTooltipToggler({ open: false }));
  };

  const onMouseDownListOptions = () => {
    listOptionsModal.open &&
      setTimeout(
        () => dispatch(listOptionsTooltipToggler({ open: true })),
        300
      );
  };

  return (
    <>
      <div className="tasks-header my-day">
        <div className="tasks-header__content">
          <div className="tasks-header__left">
            <div className="tasks-header__left--top">
              <h2>
                <SunIcon />
                <span>My Day</span>
              </h2>

              <div className="list-options-tooltip-host">
                <button
                  onMouseEnter={onMouseEnterHandler.bind(this, LIST_OPTIONS)}
                  onMouseLeave={onMouseLeaveHandler.bind(this, LIST_OPTIONS)}
                  onClick={onClickListOptions}
                  onMouseDown={onMouseDownListOptions}
                  children={<ThreeDotsIcon />}
                />
              </div>
            </div>
            <div className="tasks-header__left--bottom">
              <span>Friday, April 14</span>
            </div>
          </div>

          <div className="tasks-header__right">
            {TasksHeaderRightButtons.map((item) => (
              <div className={`${item.className}-tooltip-host`} key={item.text}>
                <button
                  onMouseEnter={onMouseEnterHandler.bind(this, item.type)}
                  onMouseLeave={onMouseLeaveHandler.bind(this, item.type)}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TasksHeader;

interface TasksHeaderRightButtonsTypes {
  text: string;
  icon: ReactElement;
  type: string;
  className: string;
}

const TasksHeaderRightButtons: TasksHeaderRightButtonsTypes[] = [
  {
    text: "Sort",
    icon: <SortIcon />,
    type: SORT,
    className: "sort",
  },
  {
    text: "Suggestions",
    icon: <LampIcon />,
    type: SUGGESTIONS,
    className: "suggestions",
  },
];
