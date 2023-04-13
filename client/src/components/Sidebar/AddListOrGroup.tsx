import React, { useRef, useState } from "react";
import PlusIcon from "../../Icons/PlusIcon";

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
  const addGroupIconRef = useRef<HTMLImageElement>(null);
  const [timerID, setTimerID] = useState<NodeJS.Timeout>();
  const [tooltipCoordinates, setTooltipCoordinates] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [addGroupHovered, setAddGroupHovered] = useState<boolean>(() => false);

  /// HANDLE ADDGROUP HOVER
  const onMouseEnter = () => {
    setTooltipCoordinates({
      x: addGroupIconRef.current!.x,
      y: addGroupIconRef.current!.y,
    });
    const id = setTimeout(() => setAddGroupHovered(true), 300);
    setTimerID(id);
  };

  const onMouseLeave = () => {
    window.clearTimeout(timerID);
    setAddGroupHovered(false);
  };

  return (
    <div className="sidebar__addList">
      <form className="addListForm" onSubmit={addNewListHandler}>
        <button>
          <PlusIcon color="#3459c1" />
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
        className="addGroupButton"
        onClick={() => {
          showAddGroupBoxHandler();
          setAddGroupHovered(false);
        }}
        ref={addGroupButtonRef}
      >
        <img
          src="./assets/icons/addGroupIcon.svg"
          alt=""
          onMouseEnter={onMouseEnter}
          onMouseOut={onMouseLeave}
          ref={addGroupIconRef}
        />

        {addGroupHovered && (
          <div
            className="tooltip-create-group"
            style={{
              opacity: "1",
              visibility: "visible",
              left: tooltipCoordinates.x - 35,
              top: tooltipCoordinates.y - 40,
            }}
          >
            <div className="content">Create Group</div>
            <div className="triangle" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddListOrGroup;
