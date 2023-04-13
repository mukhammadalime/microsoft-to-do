import ReactDOM from "react-dom";
import ShareIcon from "../../../Icons/ShareIcon";
import MoveIcon from "../../../Icons/MoveIcon";
import DublicateIcon from "../../../Icons/DublicateIcon";
import PrintIcon from "../../../Icons/PrintIcon";
import TrashIcon from "../../../Icons/TrashIcon";
import { useEffect, useRef, useState } from "react";
import { SidebarListItemType } from "../../../types/designTypes";
import GroupsModal from "../GroupRelatedFiles/GroupsModal";
import ModalActionItem from "../../ModalActionItem";

interface ListActionsPropsTypes {
  onClose: () => void;
  coordinates: { x: number; y: number };
  listItem: SidebarListItemType;
}

const ListActions = ({
  onClose,
  coordinates,
  listItem,
}: ListActionsPropsTypes) => {
  const listActionsRef = useRef<HTMLDivElement>(null);
  const groupsModalRef = useRef<HTMLDivElement>(null);
  const [fromBottom, setFromBottom] = useState(() => false);
  const [groupExist, setGroupExist] = useState<boolean>(() => false);
  const [bottomDistance, setBottomDistance] = useState<number>(0);
  const [moveListHovered, setMoveListHovered] = useState<boolean>(() => false);
  const [defaultHoverFirstAction, setDefaultHoverFirstAction] =
    useState<boolean>(true);
  const [timerID, setTimerID] = useState<NodeJS.Timeout>();
  const [timer2ID, setTimer2ID] = useState<NodeJS.Timeout>();

  // GET GROUPS FROM LOCAL STORAGE
  useEffect(() => {
    const existingGroups = JSON.parse(localStorage.getItem("groups")!) ?? [];
    setGroupExist(existingGroups.length > 0 ? true : false);
  }, []);

  // If the distance between the clicked point and window bottom is below 230, the listActions box should appear from bottom and its's bottom should be set. Otherwise, the box goes beyond the screen
  useEffect(() => {
    // 177 is the height of the ListActions box when there are 4 actions. I added another ten so that the box does not touch the bottom of the window.
    if (!groupExist && window.innerHeight - coordinates.y < 187) {
      setFromBottom(true);
    }
    // 225 is the height of the ListActions box when there are 5 actions. I added another ten so that the box does not touch the bottom of the window.
    if (groupExist && window.innerHeight - coordinates.y < 225) {
      setFromBottom(true);
    }

    if (!fromBottom && !groupExist) setBottomDistance(-coordinates.y - 177);
    if (!fromBottom && groupExist) setBottomDistance(-coordinates.y - 215);
  }, [coordinates, groupExist, fromBottom]);

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      if (
        !listActionsRef.current!.contains(e.target as HTMLDivElement) &&
        !groupsModalRef.current?.contains(e.target as HTMLDivElement)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", outsideClickHandler, true);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler, true);
    };
  }, [onClose]);

  // DELETE LIST HANDLER
  const deleteListHandler = () => {
    onClose();
    const existingLists = JSON.parse(localStorage.getItem("lists")!) ?? [];

    const updatedLists = existingLists.filter(
      (list: SidebarListItemType) => list.id !== listItem.id
    );

    localStorage.setItem("lists", JSON.stringify(updatedLists));
  };

  // ON HOVER MOVE LIST ITEM
  const onMouseEnterMoveList = () => {
    // We remove the first action backgrond color
    setDefaultHoverFirstAction(false);
    const id = setTimeout(() => setMoveListHovered(true), 300);
    setTimerID(id);
  };
  const onMouseLeaveMoveList = () => clearTimeout(timerID);

  // ON HOVER OTHER ITEMS EXCEPT MOVE LIST
  const onMouseEnterOtherItems = () => {
    // We remove the first action background color
    setDefaultHoverFirstAction(false);

    if (moveListHovered) {
      const id2 = setTimeout(() => setMoveListHovered(false), 300);
      setTimer2ID(id2);
    }
  };
  const onMouseLeaveOtherItems = () => window.clearTimeout(timer2ID);

  return (
    <div className="modal-layer">
      <div
        className={`actions-modal${fromBottom ? " modal-from-bottom" : ""}`}
        style={{
          left: coordinates.x,
          bottom: fromBottom ? -coordinates.y : bottomDistance,
        }}
        ref={listActionsRef}
      >
        <ul>
          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterOtherItems}
            onMouseLeave={onMouseLeaveOtherItems}
            name="Share list"
            icon={<ShareIcon color="#292827" />}
            defaultHoverFirstAction={defaultHoverFirstAction}
          />

          {groupExist && (
            <ModalActionItem
              onClickHandler={() => {}}
              hovered={moveListHovered}
              onMouseEnter={onMouseEnterMoveList}
              onMouseLeave={onMouseLeaveMoveList}
              name="Move list to..."
              icon={<MoveIcon />}
              rightIcon
            />
          )}

          {/* <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterOtherItems}
            name="Remove from group"
            icon={<RemoveIcon />}
          /> */}

          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterOtherItems}
            name="Dublicate list"
            icon={<DublicateIcon />}
            onMouseLeave={onMouseLeaveOtherItems}
          />

          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterOtherItems}
            name="Print list"
            icon={<PrintIcon />}
            onMouseLeave={onMouseLeaveOtherItems}
          />

          <div className="seperator"></div>

          <ModalActionItem
            onClickHandler={deleteListHandler}
            onMouseEnter={onMouseEnterOtherItems}
            onMouseLeave={onMouseLeaveOtherItems}
            name="Delete list"
            icon={<TrashIcon />}
            className="delete-row"
          />
        </ul>
      </div>

      {moveListHovered && (
        <GroupsModal
          onClose={onClose}
          coordinates={coordinates}
          groupsModalRef={groupsModalRef}
          listId={listItem.id}
        />
      )}
    </div>
  );
};

const ListActionsModal = ({
  onClose,
  coordinates,
  listItem,
}: ListActionsPropsTypes) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ListActions
          onClose={onClose}
          coordinates={coordinates}
          listItem={listItem}
        />,
        document.getElementById("modal-actions") as HTMLDivElement
      )}
    </>
  );
};

export default ListActionsModal;
