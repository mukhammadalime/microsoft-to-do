import React from "react";

const AddGroupInput = React.forwardRef<
  HTMLInputElement,
  { onAddGroup: (e: any) => void }
>(({ onAddGroup }, ref) => {
  return (
    <form className="addGroupBox" onSubmit={(e) => onAddGroup(e)}>
      <button>
        <img src="./assets/icons/groupIcon.svg" alt="" />
      </button>

      <input
        type="text"
        id="addGroupInput"
        placeholder="Untitled group"
        ref={ref}
      />
    </form>
  );
});

export default AddGroupInput;
