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
}

const GroupsOverlay = ({
  onClose,
  groupsModalRef,
  listId,
  coordinates,
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
    const groupsContainerHeight = groups.length * 38 + 12;

    if (window.innerHeight - coordinates.y < groupsContainerHeight) {
      setFromBottom(true);
    }
  }, [coordinates.y, groups]);

  const moveListHandler = (id: string) => {
    onClose();
    const selectedGroupIndex = groups.findIndex((item) => item.id === id);
    groups[selectedGroupIndex].lists.push(listId);

    localStorage.setItem("groups", JSON.stringify(groups));
  };

  return (
    <div
      ref={groupsModalRef}
      className="actions-modal groups-modal"
      style={{
        bottom: fromBottom
          ? -961
          : -(coordinates.y + groups.length * 38 + 12 + 46),
        left: coordinates.x + 200,
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
          />
        </ModalWrapper>,

        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default GroupsModal;
