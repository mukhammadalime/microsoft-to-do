import React, { ChangeEvent } from "react";

const AddGroupInput = React.forwardRef<
  HTMLInputElement,
  { onAddGroup: (e: ChangeEvent<HTMLFormElement>) => void }
>(({ onAddGroup }, ref) => {
  return (
    <form
      className="addGroupBox"
      id="addGroupBox"
      onSubmit={(e: ChangeEvent<HTMLFormElement>) => onAddGroup(e)}
    >
      <button>
        <img src="./assets/icons/groupIcon.svg" alt="" />
      </button>

      <input
        autoComplete="off"
        type="text"
        id="addGroupInput"
        placeholder="Untitled group"
        ref={ref}
      />
    </form>
  );
});

export default AddGroupInput;
