import { SidebarListItemType } from "../../../types/designTypes";
import ListIcon from "../../../Icons/ListIcon";
import { ReactElement, useState } from "react";
import ListActionsModal from "./ListActions";
import TasksListActionsModal from "../TasksListActions";

interface SidebarListItemPropsTypes {
  actionsDisabled?: boolean;
  img?: ReactElement;
  item: SidebarListItemType;
  activeListItem: string;
  setActiveListItem: (item: string) => void;
}

const SidebarListItem = ({
  item,
  img,
  actionsDisabled,
  activeListItem,
  setActiveListItem,
}: SidebarListItemPropsTypes) => {
  const [listActionsIsOpen, setListActionsIsOpen] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const checkActiveListItem = item.dublicateNumber
    ? activeListItem === `${item.name} (${item.dublicateNumber})`
    : activeListItem === item.name;

  const setActiveListItemHandler = () => {
    setActiveListItem(
      `${item.name}${item.dublicateNumber ? ` (${item.dublicateNumber})` : ""}`
    );
  };

  const onRightClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.type === "contextmenu") {
      setCoordinates({ x: e.pageX, y: e.pageY });
      setListActionsIsOpen(true);
      setActiveListItemHandler();
    }
  };

  return (
    <>
      <div
        className={`sidebar__item${
          checkActiveListItem ? " sidebar-active-item" : ""
        }`}
        onClick={(e) => {
          onRightClickHandler(e);
          setActiveListItemHandler();
        }}
        onContextMenu={onRightClickHandler}
      >
        {img ? img : <ListIcon color="#323130" />}
        <div>
          <span>{item.name}</span>
          {item.dublicateNumber && <span>{` (${item.dublicateNumber})`}</span>}
        </div>
        {/* <span>2</span> */}
      </div>

      {listActionsIsOpen && !actionsDisabled && (
        <ListActionsModal
          listItem={item}
          coordinates={coordinates}
          onClose={() => setListActionsIsOpen(false)}
        />
      )}

      {listActionsIsOpen && actionsDisabled && item.name === "Tasks" && (
        <TasksListActionsModal
          coordinates={coordinates}
          onClose={() => setListActionsIsOpen(false)}
        />
      )}
    </>
  );
};

export default SidebarListItem;
