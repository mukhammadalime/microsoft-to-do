import { SideBarItemType } from "../../../types/designTypes";
import ListIcon from "../../../Icons/ListIcon";
import { ReactElement, useState } from "react";
import ListActionsModal from "./ListActions";
import TasksListActionsModal from "../TasksListActions";

const SidebarListItem = ({
  item,
  img,
  actionsDisabled,
  activeBar,
  setActiveBar,
}: {
  actionsDisabled?: boolean;
  img?: ReactElement;
  item: SideBarItemType;
  activeBar: string;
  setActiveBar: (item: string) => void;
}) => {
  const [listActionsIsOpen, setListActionsIsOpen] = useState<boolean>(false);

  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const checkActiveBar = item.dublicateNumber
    ? activeBar === `${item.name} (${item.dublicateNumber})`
    : activeBar === item.name;

  const setActiveBarHandler = () => {
    setActiveBar(
      `${item.name}${item.dublicateNumber ? ` (${item.dublicateNumber})` : ""}`
    );
  };

  const onRightClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.type === "contextmenu") {
      setCoordinates({ x: e.pageX, y: e.pageY });
      setListActionsIsOpen(true);
      setActiveBarHandler();
    }
  };

  return (
    <>
      <>
        <div
          className={`sidebar__item${
            checkActiveBar ? " sidebar-active-item" : ""
          }`}
          onClick={(e) => {
            onRightClickHandler(e);
            setActiveBarHandler();
          }}
          onContextMenu={onRightClickHandler}
        >
          {img ? img : <ListIcon color="#323130" />}
          <div>
            <span>{item.name}</span>
            {item.dublicateNumber && (
              <span>{` (${item.dublicateNumber})`}</span>
            )}
          </div>
          {/* <span>2</span> */}
        </div>
      </>

      {listActionsIsOpen && !actionsDisabled && (
        <ListActionsModal
          item={item}
          coordinates={coordinates}
          onClose={() => setListActionsIsOpen(false)}
        />
      )}

      {listActionsIsOpen && actionsDisabled && item.name === "Tasks" && (
        <>
          <TasksListActionsModal
            coordinates={coordinates}
            onClose={() => setListActionsIsOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default SidebarListItem;
