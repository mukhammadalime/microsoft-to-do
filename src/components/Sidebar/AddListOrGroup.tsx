import React, { useRef, useState } from "react";
import PlusIcon from "../../Icons/PlusIcon";
import { CoordinatesTypes } from "../../types/designTypes";
import Tooltip from "../Tooltips/Tooltip";
import AddGroupIcon from "../../Icons/AddGroupIcon";

interface AddListOrGroupPropsTypes {
  addNewListHandler: () => void;
  newListRef: React.RefObject<HTMLInputElement>;
  showAddGroupBoxHandler: () => void;
  addGroupButtonRef: React.RefObject<HTMLDivElement>;
}

const AddListOrGroup = ({
  addNewListHandler,
  newListRef,
  showAddGroupBoxHandler,
  addGroupButtonRef,
}: AddListOrGroupPropsTypes) => {
  const addGroupIconRef = useRef<HTMLButtonElement>(null);
  const [timerID, setTimerID] = useState<NodeJS.Timeout>();
  const [tooltipCoordinates, setTooltipCoordinates] =
    useState<CoordinatesTypes>({ x: 0, y: 0 });
  const [addGroupHovered, setAddGroupHovered] = useState<boolean>(() => false);

  /// HANDLE ADDGROUP HOVER
  const onMouseEnter = () => {
    const tooltipHost = document.querySelector(
      ".add-group-tooltip-host"
    ) as HTMLDivElement;
    const position = tooltipHost.getBoundingClientRect();
    setTooltipCoordinates({
      x: position.left,
      y: position.top,
    });

    const id = setTimeout(() => setAddGroupHovered(true), 300);
    setTimerID(id);
  };

  const onMouseLeave = () => {
    clearTimeout(timerID);
    setAddGroupHovered(false);
  };

  return (
    <>
      <div className="sidebar__addList">
        <form className="addListForm" onSubmit={addNewListHandler}>
          <button>
            <PlusIcon />
          </button>

          <input
            type="text"
            id="addList"
            ref={newListRef}
            placeholder="New List"
            autoComplete="off"
          />
        </form>
        <div
          className="addGroupButtonWrapper"
          onClick={() => {
            showAddGroupBoxHandler();
            setAddGroupHovered(false);
          }}
          ref={addGroupButtonRef}
        >
          <div className="add-group-tooltip-host">
            <button
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              ref={addGroupIconRef}
              className="addGroupButton"
            >
              <AddGroupIcon />
            </button>
          </div>
        </div>
      </div>

      {addGroupHovered && (
        <Tooltip
          content="Create group"
          tooltipPosition={{
            x: tooltipCoordinates.x - 9,
            y: tooltipCoordinates.y - 38,
          }}
          trianglePosition={{
            left: "34.5px",
            bottom: "-8px",
          }}
        />
      )}
    </>
  );
};

export default AddListOrGroup;
