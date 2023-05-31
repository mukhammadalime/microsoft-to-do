import { ReactElement, useState } from "react";
import SunIcon from "../../Icons/SunIcon";
import ThreeDotsIcon from "../../Icons/ThreeDotsIcon";
import SortIcon from "../../Icons/SortIcon";
import LampIcon from "../../Icons/LampIcon";
import { CoordinatesTypes } from "../../types/designTypes";
import Tooltip from "../Tooltip/Tooltip";
import ListOptionsMenuModal from "../Modals/ListOptionsModal";
import {
  LIST_OPTIONS,
  SORT,
  SUGGESTIONS,
  onMouseEnterHelperFn,
  onMouseLeaveHelperFn,
} from "./helperFunctions";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { listOptionsModalToggle } from "../../store/action-creators/modalsActions";

const TasksHeader = () => {
  /// REDUX
  const dispatch = useAppDispatch();
  const { listOptionsModal } = useAppSelector((state) => state.modals);

  const [listOptionsHovered, setListOptionsHovered] = useState(false);
  const [sortHovered, setSortHovered] = useState(false);
  const [suggestionsHovered, setSuggestionsHovered] = useState(false);
  const [timerID, setTimerID] = useState<NodeJS.Timeout>();
  const [tooltipCoordinates, setTooltipCoordinates] =
    useState<CoordinatesTypes>({ x: 0, y: 0 });

  const onMouseEnterHandler = (type: string) => {
    onMouseEnterHelperFn(
      type,
      setListOptionsHovered,
      setSortHovered,
      setSuggestionsHovered,
      setTimerID,
      setTooltipCoordinates
    );
  };

  const onMouseLeaveHandler = (type: string) => {
    onMouseLeaveHelperFn(
      type,
      timerID,
      setListOptionsHovered,
      setSortHovered,
      setSuggestionsHovered
    );
  };

  const onClickListOptions = () => {
    dispatch(
      listOptionsModalToggle(!listOptionsModal.open, {
        x: tooltipCoordinates.x,
        y: tooltipCoordinates.y,
      })
    );

    listOptionsModal.open && setListOptionsHovered(true);
    listOptionsHovered && setListOptionsHovered(false);
    !listOptionsModal.open &&
      setTimeout(() => setListOptionsHovered(false), 300);
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

      {listOptionsHovered && (
        <Tooltip
          content="List options menu"
          tooltipPosition={{
            x: tooltipCoordinates.x - 40,
            y: tooltipCoordinates.y - 35,
          }}
          trianglePosition={{
            left: "48.75px",
            bottom: "-8px",
          }}
        />
      )}

      {sortHovered && (
        <Tooltip
          content="Sort"
          tooltipPosition={{
            x: tooltipCoordinates.x + 16.595,
            y: tooltipCoordinates.y - 35,
          }}
          trianglePosition={{
            left: "12.25px",
            bottom: "-8px",
          }}
        />
      )}

      {suggestionsHovered && (
        <Tooltip
          content="Suggestions"
          tooltipPosition={{
            x: tooltipCoordinates.x + 20.415,
            y: tooltipCoordinates.y - 35,
          }}
          trianglePosition={{
            left: "34.115px",
            bottom: "-8px",
          }}
        />
      )}

      {listOptionsModal.open && (
        <ListOptionsMenuModal
          onClose={() => listOptionsModalToggle(false)}
          coordinates={tooltipCoordinates}
        />
      )}
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
