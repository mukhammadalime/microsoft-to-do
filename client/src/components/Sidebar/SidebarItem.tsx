import { SideBarItemType } from "../../types/designTypes";
import ListIcon from "../../Icons/ListIcon";
import { ReactElement, useState } from "react";
import ListActionsModal from "./ListRelatedFiles/ListActions";
import TasksListActionsModal from "./TasksListActions";

const SidebarItem = ({
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
    console.log(item.name);

    e.preventDefault();
    if (e.type === "contextmenu") {
      setCoordinates({ x: e.pageX, y: e.pageY });
      setListActionsIsOpen(true);
      setActiveBarHandler();
    }

    console.log(listActionsIsOpen);
  };

  return (
    <>
      <div
        className={`sidebar__itemWrapper${checkActiveBar ? " active" : ""}`}
        onClick={onRightClickHandler}
        onContextMenu={onRightClickHandler}
      >
        <div className={`sidebar__item`} onClick={setActiveBarHandler}>
          {img ? img : <ListIcon color="#323130" />}
          <div>
            <span>{item.name}</span>
            {item.dublicateNumber && (
              <span>{` (${item.dublicateNumber})`}</span>
            )}
          </div>
          {/* <span>2</span> */}
        </div>
      </div>

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

export default SidebarItem;
