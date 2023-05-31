import { useEffect, useState } from "react";
import {
  CoordinatesTypes,
  SidebarGroupItemType,
  SidebarListItemType,
} from "../../../../types/designTypes";
import GroupActionsModal from "../../../Modals/GroupActionsModal";
import GroupIcon from "../../../../Icons/GroupIcon";
import ArrowLeftIcon from "../../../../Icons/ArrowLeftIcon";
import EditingMode from "./EditingMode";
import GroupItems from "./GroupItems";

interface SidebarGroupItemTypes extends SidebarGroupItemType {
  activeListItem: string;
  setActiveListItem: (str: string) => void;
  updateGroupHandler: (items: SidebarGroupItemType[]) => void;
}

const SidebarGroupItem = ({
  itemName,
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
    left: 0,
    top: 0,
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

    const groupItemsList = document.getElementById(id) as HTMLDivElement;

    if (groupItemsList?.contains(e.target as HTMLDivElement)) {
      return;
    }

    if (e.type === "contextmenu") {
      setCoordinates({ left: e.pageX, top: e.pageY });
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
              <GroupIcon />
              <span>
                {itemName}{" "}
                <span>{dublicateNumber ? ` (${dublicateNumber})` : ""}</span>
              </span>
            </div>
            <ArrowLeftIcon />
          </div>
        )}

        {editingMode && (
          <EditingMode toggleGroupBox={toggleGroupBox} itemName={itemName} />
        )}

        {opened && (
          <GroupItems
            groupID={id}
            groupLists={groupLists}
            activeListItem={activeListItem}
            setActiveListItem={setActiveListItem}
          />
        )}
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
