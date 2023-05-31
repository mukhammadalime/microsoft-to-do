import {
  CoordinatesTypes,
  SidebarListItemType,
} from "../../../types/designTypes";
import ListIcon from "../../../Icons/ListIcon";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ListActionsModal from "../../Modals/ListActionsModal";

interface SidebarListItemPropsTypes {
  actionsDisabled?: boolean | "limited";
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
  const navigate = useNavigate();

  const [listActionsIsOpen, setListActionsIsOpen] = useState<boolean>(false);
  const [checkActiveListItem, setCheckActiveListItem] = useState(false);
  const [coordinates, setCoordinates] = useState<CoordinatesTypes>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const itemIsAtive = item.dublicateNumber
      ? activeListItem === `${item.itemName} (${item.dublicateNumber})`
      : activeListItem === item.itemName;

    setCheckActiveListItem(itemIsAtive);
  }, [activeListItem, item.dublicateNumber, item.itemName]);

  const setActiveListItemHandler = () => {
    setActiveListItem(
      `${item.itemName}${
        item.dublicateNumber ? ` (${item.dublicateNumber})` : ""
      }`
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
        id={item.id}
        onClick={(e) => {
          onRightClickHandler(e);
          setActiveListItemHandler();
          navigate(`/tasks/${item.id}`);
        }}
        // We enable inspect on some lists with actions disabled
        onContextMenu={
          actionsDisabled === true ? () => {} : onRightClickHandler
        }
      >
        {img ? img : <ListIcon color="#323130" />}
        <div>
          <span>{item.itemName}</span>
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

      {listActionsIsOpen && actionsDisabled === "limited" && (
        <ListActionsModal
          listItem={item}
          coordinates={coordinates}
          onClose={() => setListActionsIsOpen(false)}
          tasksList
        />
      )}
    </>
  );
};

export default SidebarListItem;
