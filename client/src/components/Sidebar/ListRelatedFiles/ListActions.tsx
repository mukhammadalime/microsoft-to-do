/* eslint-disable jsx-a11y/role-supports-aria-props */
import ReactDOM from "react-dom";
import ShareIcon from "../../../Icons/ShareIcon";
import MoveIcon from "../../../Icons/MoveIcon";
import DublicateIcon from "../../../Icons/DublicateIcon";
import PrintIcon from "../../../Icons/PrintIcon";
import TrashIcon from "../../../Icons/TrashIcon";
import ChevronRightIcon from "../../../Icons/ChevronRightIcon";
import { useEffect, useRef, useState } from "react";
import { SideBarItemType } from "../../../types/designTypes";
import GroupsModal from "../GroupRelatedFiles/GroupsModal";

const ListActions = ({
  onClose,
  coordinates,
  item,
}: {
  onClose: () => void;
  coordinates: { x: number; y: number };
  item: SideBarItemType;
}) => {
  const listActionsRef = useRef<HTMLDivElement>(null);
  const groupsModalRef = useRef<HTMLDivElement>(null);
  const [fromBottom, setFromBottom] = useState(() => false);
  const [groupExist, setGroupExist] = useState<boolean>(() => false);
  const [bottomIndex, setBottomIndex] = useState<number>(0);
  const [moveListHovered, setMoveListHovered] = useState(() => false);

  // GET GROUPS FROM LOCAL STORAGE
  useEffect(() => {
    const existingGroups = JSON.parse(localStorage.getItem("groups")!) ?? [];
    setGroupExist(existingGroups.length > 0 ? true : false);
  }, []);

  // If the distance between the clicked point and window bottom is below 230, the listActions box should appear from bottom and its's bottom should be set. Otherwise, the box goes beyond the screen
  useEffect(() => {
    if (!groupExist && window.innerHeight - coordinates.y < 187) {
      setFromBottom(true);
    }

    if (groupExist && window.innerHeight - coordinates.y < 225) {
      setFromBottom(true);
    }

    if (!fromBottom && !groupExist) {
      setBottomIndex(-coordinates.y - 177);
    }

    if (!fromBottom && groupExist) {
      setBottomIndex(-coordinates.y - 215);
    }
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
      (list: SideBarItemType) => list.id !== item.id
    );

    localStorage.setItem("lists", JSON.stringify(updatedLists));
  };

  // MOVELISTHOVERED HANDLERS
  const onMouseEnter = () => {
    setTimeout(() => setMoveListHovered(true), 300);
  };

  const onHoverOtherItemsHandler = () => {
    if (moveListHovered) {
      setTimeout(() => setMoveListHovered(false), 300);
    }
  };

  return (
    <div className="modal-layer">
      <div
        className={`actions-modal${fromBottom ? " modal-from-bottom" : ""}`}
        style={{
          left: coordinates.x,
          bottom: fromBottom ? -coordinates.y : bottomIndex,
        }}
        ref={listActionsRef}
      >
        <ul>
          <li>
            <button onMouseEnter={onHoverOtherItemsHandler}>
              <i>
                <ShareIcon color="#292827" />
              </i>
              <span>Share list</span>
            </button>
          </li>

          {groupExist && (
            <li>
              <button
                onMouseEnter={onMouseEnter}
                className={moveListHovered ? "action-hovered" : ""}
              >
                <i>
                  <MoveIcon />
                </i>
                <span>Move list to...</span>
                <ChevronRightIcon />
              </button>
            </li>
          )}

          {/* <li>
            <button onMouseEnter={onHoverOtherItemsHandler}>
              <i>
                <img src="./assets/icons/removeIcon.svg" alt="" />
              </i>
              <span>Remove from group</span>
            </button>
          </li> */}

          <li>
            <button onMouseEnter={onHoverOtherItemsHandler}>
              <i>
                <DublicateIcon />
              </i>

              <span>Dublicate list</span>
            </button>
          </li>
          <li>
            <button onMouseEnter={onHoverOtherItemsHandler}>
              <i>
                <PrintIcon />
              </i>
              <span>Print list</span>
            </button>
          </li>

          <div className="seperator"></div>
          <li className="delete-row">
            <button
              onClick={deleteListHandler}
              onMouseEnter={onHoverOtherItemsHandler}
            >
              <i>
                <TrashIcon />
              </i>
              <span>Delete list</span>
            </button>
          </li>
        </ul>
      </div>

      {moveListHovered && (
        <GroupsModal
          onClose={onClose}
          coordinates={coordinates}
          groupsModalRef={groupsModalRef}
          listId={item.id}
        />
      )}
    </div>
  );
};

const ListActionsModal = ({
  onClose,
  coordinates,
  item,
}: {
  onClose: () => void;
  coordinates: { x: number; y: number };
  item: SideBarItemType;
}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ListActions onClose={onClose} coordinates={coordinates} item={item} />,
        document.getElementById("modal-actions") as HTMLDivElement
      )}
    </>
  );
};

export default ListActionsModal;
