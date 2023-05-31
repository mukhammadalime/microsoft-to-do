const EditingMode = ({
  toggleGroupBox,
  itemName,
}: {
  toggleGroupBox: () => void;
  itemName: string;
}) => {
  return (
    <form className="addGroupBox" id="addGroupBox" onClick={toggleGroupBox}>
      <button>
        <img src="/assets/icons/groupIcon.svg" alt="" />
      </button>

      <input
        autoComplete="off"
        type="text"
        id="addGroupInput"
        placeholder="Untitled group"
        defaultValue={itemName}
      />
    </form>
  );
};

export default EditingMode;
