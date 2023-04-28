import { useState } from "react";
import SunIcon from "../../Icons/SunIcon";
import ThreeDotsIcon from "../../Icons/ThreeDotsIcon";
import SortIcon from "../../Icons/SortIcon";
import LampIcon from "../../Icons/LampIcon";
import { CoordinatesTypes } from "../../types/designTypes";
import Tooltip from "../Tooltips/Tooltip";
import ListOptionsMenuModal from "./ListOptionsMenu";

const TasksHeader = () => {
  const [listOptionsHovered, setListOptionsHovered] = useState(false);
  const [listOptionsOpen, setListOptionsOpen] = useState(false);
  const [listOptionsTimerID, setListOptionsTimerID] =
    useState<NodeJS.Timeout>();
  const [listOptionsTooltipCoordinates, setListOptionsTooltipCoordinates] =
    useState<CoordinatesTypes>({ x: 0, y: 0 });

  const onMouseEnterListOptions = () => {
    const tooltipHost = document.querySelector(
      ".list-options-tooltip-host"
    ) as HTMLDivElement;
    const searchTooltipPosition = tooltipHost.getBoundingClientRect();
    setListOptionsTooltipCoordinates({
      x: searchTooltipPosition.left,
      y: searchTooltipPosition.top,
    });

    const id = setTimeout(() => setListOptionsHovered(true), 400);
    setListOptionsTimerID(id);
  };

  const onMouseLeaveListOptions = () => {
    clearTimeout(listOptionsTimerID);
    setListOptionsHovered(false);
  };

  const onClickListOptions = () => {
    setListOptionsOpen((prevState) => !prevState);
    if (listOptionsHovered) setListOptionsHovered(false);
    else setTimeout(() => setListOptionsHovered(false), 400);
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
                  onMouseEnter={onMouseEnterListOptions}
                  onMouseLeave={onMouseLeaveListOptions}
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
            <button>
              <SortIcon />
              <span>Sort</span>
            </button>
            <button>
              <LampIcon />
              <span>Suggestions</span>
            </button>
          </div>
        </div>
      </div>

      {listOptionsHovered && (
        <Tooltip
          content="List options menu"
          tooltipPosition={{
            x: listOptionsTooltipCoordinates.x - 40,
            y: listOptionsTooltipCoordinates.y - 35,
          }}
          trianglePosition={{
            left: "48.75px",
            bottom: "-8px",
          }}
        />
      )}

      {listOptionsOpen && (
        <ListOptionsMenuModal
          onClose={() => setListOptionsOpen(false)}
          coordinates={listOptionsTooltipCoordinates}
        />
      )}
    </>
  );
};

export default TasksHeader;
