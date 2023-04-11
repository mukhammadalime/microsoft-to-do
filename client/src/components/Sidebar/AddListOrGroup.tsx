import React, { useState } from "react";
import PlusIcon from "../../Icons/PlusIcon";

interface AddListOrGroupTypes {
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
}: AddListOrGroupTypes) => {
  const [addGroupHovered, setAddGroupHovered] = useState<boolean>(() => false);

  /// HANDLE ADDGROUP HOVER
  const onMouseEnter = () => setTimeout(() => setAddGroupHovered(true), 300);
  const onMouseLeave = () => setAddGroupHovered(false);

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
        className="addGroup"
        onClick={showAddGroupBoxHandler}
        ref={addGroupButtonRef}
      >
        <img
          src="./assets/icons/addGroupIcon.svg"
          alt=""
          onMouseEnter={onMouseEnter}
          onMouseOut={onMouseLeave}
        />

        <div
          className="tooltip-create-group"
          style={{
            opacity: addGroupHovered ? "1" : "0",
            visibility: addGroupHovered ? "visible" : "hidden",
          }}
        >
          <div className="content">Create Group</div>
          <div className="triangle" />
        </div>
      </div>
    </div>
  );
};

export default AddListOrGroup;
