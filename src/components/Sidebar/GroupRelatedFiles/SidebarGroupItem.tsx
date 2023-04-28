import { useEffect, useState } from "react";
import {
  CoordinatesTypes,
  SidebarGroupItemType,
  SidebarListItemType,
} from "../../../types/designTypes";
import GroupActionsModal from "./GroupActions";
import { v4 as uuidv4 } from "uuid";
import SidebarListItem from "../ListRelatedFiles/SidebarListItem";

interface SidebarGroupItemTypes extends SidebarGroupItemType {
  activeListItem: string;
  setActiveListItem: (str: string) => void;
  updateGroupHandler: (items: SidebarGroupItemType[]) => void;
}

const SidebarGroupItem = ({
  name,
  opened,
  id,
  lists,
  dublicateNumber,
  activeListItem,
  setActiveListItem,
  updateGroupHandler,
}: SidebarGroupItemTypes) => {
  const [groupActionsIsOpen, setGroupActionsIsOpen] = useState<boolean>(
    () => false
  );
  const [coordinates, setCoordinates] = useState<CoordinatesTypes>({
    x: 0,
    y: 0,
  });
  const [editingMode, setEditingMode] = useState(() => false);

  const [groupLists, setGroupLists] = useState<SidebarListItemType[]>([]);

  // GET LISTS FROM LOCAL STORAGE
  useEffect(() => {
    const existingLists = JSON.parse(localStorage.getItem("lists")!) ?? [];
    const currentGroupLists: SidebarListItemType[] = [];

    for (let i = 0; i < lists!.length; i++) {
      const item = existingLists.find(
        (item: SidebarListItemType) => item.id === lists![i]
      );
      currentGroupLists.push(item);
    }

    setGroupLists(currentGroupLists);
  }, [lists]);

  // TOGGLE GROUP BOX
  const toggleGroupBox = () => {
    const existingGroups = JSON.parse(localStorage.getItem("groups")!);
    const currentGroupIndex = existingGroups.findIndex(
      (item: SidebarGroupItemType) => item.id === id
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
            />
          </form>
        )}

        <div className="groupBox__items">
          <div className="groupBox__items--borderLine"></div>
          {groupLists.length > 0 ? (
            groupLists.map((item) => (
              <SidebarListItem
                key={uuidv4()}
                item={item}
                activeListItem={activeListItem}
                setActiveListItem={(item: string) => setActiveListItem(item)}
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
          groupId={id}
          lists={lists}
          coordinates={coordinates}
          onClose={() => setGroupActionsIsOpen(false)}
        />
      )}
    </>
  );
};

export default SidebarGroupItem;
