import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  CoordinatesTypes,
  SidebarGroupItemType,
} from "../../../types/designTypes";
import { v4 as uuidv4 } from "uuid";
import ModalWrapper from "../../ModalWrapper";

interface GroupsModalPropsTypes {
  onClose: () => void;
  groupsModalRef: React.RefObject<HTMLDivElement>;
  listId: string;
  coordinates: CoordinatesTypes;
  listActionsFromBottom: boolean;
}

const GroupsOverlay = ({
  onClose,
  groupsModalRef,
  listId,
  coordinates,
  listActionsFromBottom,
}: GroupsModalPropsTypes) => {
  const [groups, setGroups] = useState<SidebarGroupItemType[]>(() => []);
  const [fromBottom, setFromBottom] = useState<boolean>(() => false);

  // GET GROUPS FROM LOCAL STORAGE
  useEffect(() => {
    const existingGroups = JSON.parse(localStorage.getItem("groups")!) ?? [];
    setGroups(existingGroups);
  }, []);

  // Here we need to calculate if the distance between the clicked point and window bottom is bigger than the groups modal container
  useEffect(() => {
    // 38 is the height of one action. 12 is the padding of the box
    const groupsContainerHeight = groups.length * 38 + 12;

    // 45 is the height of one action plus 6px padding plus 1px
    // 170 is the height between the clicked point and the top of "Move list to..." action
    // 15 is just for groupsBox not to touch the window bottom
    if (
      (!listActionsFromBottom &&
        window.innerHeight - coordinates.top - 45 - 15 <
          groupsContainerHeight) ||
      (listActionsFromBottom &&
        window.innerHeight - coordinates.top + 170 + 15 < groupsContainerHeight)
    ) {
      setFromBottom(true);
    }
  }, [coordinates.top, groups, listActionsFromBottom]);

  const moveListHandler = (id: string) => {
    onClose();
    const selectedGroupIndex = groups.findIndex((item) => item.id === id);
    groups[selectedGroupIndex].lists.push(listId);

    localStorage.setItem("groups", JSON.stringify(groups));
  };

  const groupsBoxFromBottom = listActionsFromBottom
    ? -coordinates.top + 170 - (groups.length * 38 + 12)
    : -(coordinates.top + groups.length * 38 + 12 + 45);

  return (
    <div
      ref={groupsModalRef}
      className="actions-modal groups-modal"
      style={{
        bottom: fromBottom ? -961 : groupsBoxFromBottom,
        left: coordinates.left + 200,
        overflowY: groups.length * 38 + 12 > 951 ? "scroll" : "unset",
      }}
    >
      <ul>
        {groups.map((group: SidebarGroupItemType) => (
          <li key={uuidv4()}>
            <button onClick={moveListHandler.bind(null, group.id)}>
              <i>
                <img src="/assets/icons/groupIcon.svg" alt="" />
              </i>
              <span>
                {group.itemName}{" "}
                {group.dublicateNumber && <span>{group.dublicateNumber}</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const GroupsModal = ({
  onClose,
  groupsModalRef,
  listId,
  coordinates,
  listActionsFromBottom,
}: GroupsModalPropsTypes) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper>
          <GroupsOverlay
            listId={listId}
            onClose={onClose}
            groupsModalRef={groupsModalRef}
            coordinates={coordinates}
            listActionsFromBottom={listActionsFromBottom}
          />
        </ModalWrapper>,

        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default GroupsModal;
