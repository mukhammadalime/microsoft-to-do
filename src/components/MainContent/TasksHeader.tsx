import { useState } from "react";
import SunIcon from "../../Icons/SunIcon";
import ThreeDotsIcon from "../../Icons/ThreeDotsIcon";
import SortIcon from "../../Icons/SortIcon";
import LampIcon from "../../Icons/LampIcon";
import { CoordinatesTypes } from "../../types/designTypes";
import Tooltip from "../Tooltips/Tooltip";
import ListOptionsMenuModal from "./ListOptionsMenu";

const SUGGESTIONS: string = "SUGGESTIONS";
const LIST_OPTIONS: string = "LIST_OPTIONS";
const SORT: string = "SORT";

const TasksHeader = () => {
  const [listOptionsHovered, setListOptionsHovered] = useState(false);
  const [sortHovered, setSortHovered] = useState(false);
  const [suggestionsHovered, setSuggestionsHovered] = useState(false);
  const [listOptionsOpen, setListOptionsOpen] = useState(false);
  const [timerID, setTimerID] = useState<NodeJS.Timeout>();
  const [tooltipCoordinates, setTooltipCoordinates] =
    useState<CoordinatesTypes>({ x: 0, y: 0 });

  const onMouseEnterHandler = (type: string) => {
    const tooltipHostClassname =
      type === LIST_OPTIONS
        ? ".list-options-tooltip-host"
        : type === SORT
        ? ".sort-tooltip-host"
        : ".suggestions-tooltip-host";

    const tooltipHost = document.querySelector(
      tooltipHostClassname
    ) as HTMLDivElement;

    const searchTooltipPosition = tooltipHost.getBoundingClientRect();
    setTooltipCoordinates({
      x: searchTooltipPosition.left,
      y: searchTooltipPosition.top,
    });

    switch (type) {
      case LIST_OPTIONS:
        const id = setTimeout(() => setListOptionsHovered(true), 300);
        setTimerID(id);
        break;
      case SORT:
        const id2 = setTimeout(() => setSortHovered(true), 300);
        setTimerID(id2);
        break;
      case SUGGESTIONS:
        const id3 = setTimeout(() => setSuggestionsHovered(true), 300);
        setTimerID(id3);
        break;
    }
  };

  const onMouseLeaveHandler = (type: string) => {
    clearTimeout(timerID);

    switch (type) {
      case LIST_OPTIONS:
        setListOptionsHovered(false);
        break;
      case SORT:
        setSortHovered(false);
        break;
      case SUGGESTIONS:
        setSuggestionsHovered(false);
        break;
    }
  };

  const onClickListOptions = () => {
    setListOptionsOpen((prevState) => !prevState);
    listOptionsOpen && setListOptionsHovered(true);
    listOptionsHovered && setListOptionsHovered(false);
    !listOptionsOpen && setTimeout(() => setListOptionsHovered(false), 300);
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
            <div className="sort-tooltip-host">
              <button
                onMouseEnter={onMouseEnterHandler.bind(this, SORT)}
                onMouseLeave={onMouseLeaveHandler.bind(this, SORT)}
              >
                <SortIcon />
                <span>Sort</span>
              </button>
            </div>

            <div className="suggestions-tooltip-host">
              <button
                onMouseEnter={onMouseEnterHandler.bind(this, SUGGESTIONS)}
                onMouseLeave={onMouseLeaveHandler.bind(this, SUGGESTIONS)}
              >
                <LampIcon />
                <span>Suggestions</span>
              </button>
            </div>
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

      {listOptionsOpen && (
        <ListOptionsMenuModal
          onClose={() => setListOptionsOpen(false)}
          coordinates={tooltipCoordinates}
        />
      )}
    </>
  );
};

export default TasksHeader;
