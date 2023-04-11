import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";
import { SideBarGroupType } from "../../../types/designTypes";

const GroupActions = ({
  onClose,
  coordinates,
  itemId,
  lists,
}: {
  onClose: () => void;
  coordinates: { x: number; y: number };
  itemId: string;
  lists: string[] | [];
}) => {
  const groupActionsRef = useRef<HTMLDivElement>(null);
  const fromBottom = window.innerHeight - coordinates.y < 111;

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      if (!groupActionsRef.current!.contains(e.target as HTMLDivElement)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", outsideClickHandler, true);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler, true);
    };
  }, [onClose]);

  // DELETE GROUP HANDLER
  const deleteGroupHandler = () => {
    onClose();
    const existingGroups = JSON.parse(localStorage.getItem("groups")!) ?? [];

    const updatedGroups = existingGroups.filter(
      (item: SideBarGroupType) => item.id !== itemId
    );

    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };

  // RENAME GROUP HANDLER
  const renameGroupHandler = () => {
    onClose();
    const existingGroups = JSON.parse(localStorage.getItem("groups")!) ?? [];

    const editingGroupIndex = existingGroups.findIndex(
      (item: SideBarGroupType) => item.id === itemId
    );
    const editingGroup = existingGroups[editingGroupIndex];

    // existingGroups[editingGroupIndex] = { ...editingGroup, name: "" };

    // localStorage.setItem("groups", JSON.stringify(existingGroups));
  };

  // UNGROUP LISTS HANDLER
  const ungroupListsHandler = () => {};

  return (
    <div className="modal-layer">
      <div
        className={`actions-modal ${fromBottom ? " modal-from-bottom" : ""}`}
        style={{
          bottom: fromBottom ? -coordinates.y : -coordinates.y - 101,
          left: coordinates.x,
        }}
        ref={groupActionsRef}
      >
        <ul>
          <li>
            <button onClick={renameGroupHandler}>
              <i>
                <img src="./assets/icons/renameGroupIcon.svg" alt="" />
              </i>
              <span>Rename group</span>
            </button>
          </li>

          <div className="seperator"></div>

          <li className="delete-row">
            {lists?.length > 0 && (
              <>
                <button onClick={ungroupListsHandler}>
                  <i>
                    <img src="./assets/icons/ungroupIcon.svg" alt="" />
                  </i>
                  <span>Ungroup lists</span>
                </button>
              </>
            )}

            {lists.length === 0 && (
              <>
                <button onClick={deleteGroupHandler}>
                  <i>
                    <img src="./assets/icons/trashIcon-2.svg" alt="" />
                  </i>
                  <span>Delete group</span>
                </button>
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

const GroupActionsModal = ({
  onClose,
  coordinates,
  itemId,
  lists,
}: {
  onClose: () => void;
  coordinates: { x: number; y: number };
  itemId: string;
  lists: string[] | [];
}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <GroupActions
          lists={lists}
          onClose={onClose}
          coordinates={coordinates}
          itemId={itemId}
        />,
        document.getElementById("modal-actions") as HTMLDivElement
      )}
    </>
  );
};

export default GroupActionsModal;
