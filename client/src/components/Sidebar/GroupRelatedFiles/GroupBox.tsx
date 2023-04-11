import { useEffect, useState } from "react";
import { SideBarGroupType, SideBarItemType } from "../../../types/designTypes";
import GroupActionsModal from "./GroupActions";
import { v4 as uuidv4 } from "uuid";
import SidebarItem from "../SidebarItem";
import ListActionsModal from "../ListRelatedFiles/ListActions";

interface GroupBoxTypes extends SideBarGroupType {
  activeBar: string;
  setActiveBar: (str: string) => void;
  updateGroupHandler: (items: SideBarGroupType[]) => void;
}

const GroupBox = ({
  name,
  opened,
  id,
  lists,
  dublicateNumber,
  activeBar,
  setActiveBar,
  updateGroupHandler,
}: GroupBoxTypes) => {
  const [groupActionsIsOpen, setGroupActionsIsOpen] = useState<boolean>(
    () => false
  );
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [editingMode, setEditingMode] = useState(() => false);

  const [groupLists, setGroupLists] = useState<SideBarItemType[]>([]);

  useEffect(() => {
    const existingLists = JSON.parse(localStorage.getItem("lists")!) ?? [];
    const currentGroupLists: SideBarItemType[] = [];

    for (let i = 0; i < lists!.length; i++) {
      const item = existingLists.find(
        (item: SideBarItemType) => item.id === lists![i]
      );
      currentGroupLists.push(item);
    }

    setGroupLists(currentGroupLists);
  }, [lists]);

  // TOGGLE GROUP BOX
  const toggleGroupBox = () => {
    const existingGroups = JSON.parse(localStorage.getItem("groups")!);
    const currentGroupIndex = existingGroups.findIndex(
      (item: SideBarGroupType) => item.id === id
    );

    const currentGroup = existingGroups[currentGroupIndex];
    existingGroups[currentGroupIndex] = { ...currentGroup, opened: !opened };

    localStorage.setItem("groups", JSON.stringify(existingGroups));
    updateGroupHandler(existingGroups);
  };

  const onRightClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.type === "contextmenu") {
      setCoordinates({ x: e.pageX, y: e.pageY });
      setGroupActionsIsOpen(true);
    }
    return false;
  };

  return (
    <>
      <div
        className={`groupBox${opened ? " groupBox-opened" : ""}${
          editingMode ? " editing-group-mode" : ""
        }`}
        onClick={onRightClickHandler}
        onContextMenu={onRightClickHandler}
      >
        {!editingMode && (
          <div className="groupBox__header" onClick={toggleGroupBox}>
            <div>
              <img src="./assets/icons/groupIcon.svg" alt="" />
              <span>
                {name}{" "}
                <span>{dublicateNumber ? ` (${dublicateNumber})` : ""}</span>
              </span>
            </div>

            <img src="./assets/icons/arrow-left.svg" alt="" />
          </div>
        )}

        {editingMode && (
          <form
            className="addGroupBox"
            id="addGroupBox"
            onClick={toggleGroupBox}
          >
            <button>
              <img src="./assets/icons/groupIcon.svg" alt="" />
            </button>

            <input
              autoComplete="off"
              type="text"
              id="addGroupInput"
              placeholder="Untitled group"
              defaultValue={name}
              // ref={ref}
            />
          </form>
        )}

        <div className="groupBox__items">
          {groupLists.length > 0 ? (
            groupLists.map((item) => (
              <SidebarItem
                key={uuidv4()}
                item={item}
                activeBar={activeBar}
                setActiveBar={(item: string) => setActiveBar(item)}
              />
            ))
          ) : (
            <div className="groupBox__empty">
              <span>Drag here to add lists</span>
            </div>
          )}
        </div>
      </div>

      {groupActionsIsOpen && (
        <GroupActionsModal
          itemId={id}
          lists={lists}
          coordinates={coordinates}
          onClose={() => setGroupActionsIsOpen(false)}
        />
      )}
    </>
  );
};

export default GroupBox;
