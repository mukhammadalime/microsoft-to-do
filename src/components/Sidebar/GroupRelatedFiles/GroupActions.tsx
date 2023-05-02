import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import {
  CoordinatesTypes,
  SidebarListItemType,
} from "../../../types/designTypes";
import ModalActionItem from "../../ModalActionItem";
import UngroupIcon from "../../../Icons/UngroupIcon";
import TrashIcon2 from "../../../Icons/TrashIcon2";
import ModalWrapper from "../../ModalWrapper";

interface GroupActionsPropsTypes {
  onClose: () => void;
  coordinates: CoordinatesTypes;
  groupId: string;
  lists: string[] | [];
}

const GroupActions = ({
  onClose,
  coordinates,
  groupId,
  lists,
}: GroupActionsPropsTypes) => {
  const groupActionsRef = useRef<HTMLDivElement>(null);
  const fromBottom = window.innerHeight - coordinates.y < 111;
  const [defaultHoverFirstAction, setDefaultHoverFirstAction] =
    useState<boolean>(true);

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
      (item: SidebarListItemType) => item.id !== groupId
    );

    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };

  // RENAME GROUP HANDLER
  const renameGroupHandler = () => {
    onClose();
    const existingGroups = JSON.parse(localStorage.getItem("groups")!) ?? [];

    const editingGroupIndex = existingGroups.findIndex(
      (item: SidebarListItemType) => item.id === groupId
    );
    const editingGroup = existingGroups[editingGroupIndex];

    // existingGroups[editingGroupIndex] = { ...editingGroup, name: "" };

    // localStorage.setItem("groups", JSON.stringify(existingGroups));
  };

  // UNGROUP LISTS HANDLER
  const ungroupListsHandler = () => {
    onClose();
    const existingGroups = JSON.parse(localStorage.getItem("groups")!) ?? [];

    const updatedGroups = existingGroups.filter(
      (item: SidebarListItemType) => item.id !== groupId
    );

    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };

  /// ON MOUSE ENTER HANDLER
  const onMouseEnterHandler = () => {
    setDefaultHoverFirstAction(false);
  };

  return (
    <div
      className={`actions-modal ${fromBottom ? " modal-from-bottom" : ""}`}
      style={{
        bottom: fromBottom ? -coordinates.y : -coordinates.y - 101,
        left: coordinates.x,
      }}
      ref={groupActionsRef}
    >
      <ul>
        <ModalActionItem
          onClickHandler={renameGroupHandler}
          onMouseEnter={onMouseEnterHandler}
          name="Rename group"
          icon={<img src="/assets/icons/renameGroupIcon.svg" alt="" />}
          defaultHoverFirstAction={defaultHoverFirstAction}
        />

        <div className="seperator"></div>

        <ModalActionItem
          onClickHandler={
            lists?.length > 0 ? ungroupListsHandler : deleteGroupHandler
          }
          onMouseEnter={onMouseEnterHandler}
          name={lists?.length > 0 ? "Ungroup lists" : "Delete group"}
          icon={lists?.length > 0 ? <UngroupIcon /> : <TrashIcon2 />}
          className="delete-row"
        />
      </ul>
    </div>
  );
};

const GroupActionsModal = ({
  onClose,
  coordinates,
  groupId,
  lists,
}: GroupActionsPropsTypes) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper>
          <GroupActions
            lists={lists}
            onClose={onClose}
            coordinates={coordinates}
            groupId={groupId}
          />
        </ModalWrapper>,
        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default GroupActionsModal;
