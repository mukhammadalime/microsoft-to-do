import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import PrintIcon from "../../Icons/PrintIcon";
import DublicateIcon from "../../Icons/DublicateIcon";
import { SideBarGroupType } from "../../types/designTypes";

const TasksListActionsOverlay = ({
  onClose,
  coordinates,
}: {
  onClose: () => void;
  coordinates: { x: number; y: number };
}) => {
  const tasksRef = useRef<HTMLDivElement>(null);
  const [groups, setGroups] = useState<SideBarGroupType[]>(() => []);

  // GET GROUPS FROM LOCAL STORAGE
  useEffect(() => {
    const existingGroups = JSON.parse(localStorage.getItem("groups")!) ?? [];
    setGroups(existingGroups);
  }, []);

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      if (!tasksRef.current!.contains(e.target as HTMLDivElement)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", outsideClickHandler, true);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler, true);
    };
  }, [onClose]);

  return (
    <div className="modal-layer">
      <div
        className={`actions-modal`}
        style={{
          left: coordinates.x,
          bottom: -coordinates.y - 88,
        }}
        ref={tasksRef}
      >
        <ul>
          <li>
            <button>
              <i>
                <DublicateIcon />
              </i>

              <span>Dublicate list</span>
            </button>
          </li>
          <li>
            <button>
              <i>
                <PrintIcon />
              </i>
              <span>Print list</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const TasksListActionsModal = ({
  onClose,
  coordinates,
}: {
  onClose: () => void;
  coordinates: { x: number; y: number };
}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <TasksListActionsOverlay onClose={onClose} coordinates={coordinates} />,
        document.getElementById("modal-actions") as HTMLDivElement
      )}
    </>
  );
};

export default TasksListActionsModal;
