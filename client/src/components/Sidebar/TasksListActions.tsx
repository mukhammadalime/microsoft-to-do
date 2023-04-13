import ReactDOM from "react-dom";
import PrintIcon from "../../Icons/PrintIcon";
import ModalActionItem from "../ModalActionItem";
import { useEffect, useRef, useState } from "react";
import DublicateIcon from "../../Icons/DublicateIcon";

interface TasksListsActionsProps {
  onClose: () => void;
  coordinates: { x: number; y: number };
}

const TasksListActionsOverlay = ({
  onClose,
  coordinates,
}: TasksListsActionsProps) => {
  const tasksRef = useRef<HTMLDivElement>(null);
  const [defaultHoverFirstAction, setDefaultHoverFirstAction] =
    useState<boolean>(true);

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

  const onMouseEnterHandlar = () => setDefaultHoverFirstAction(false);

  return (
    <div className="modal-layer">
      <div
        className="actions-modal"
        style={{
          left: coordinates.x,
          bottom: -coordinates.y - 88,
        }}
        ref={tasksRef}
      >
        <ul>
          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterHandlar}
            name="Dublicate list"
            icon={<DublicateIcon />}
            defaultHoverFirstAction={defaultHoverFirstAction}
          />

          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterHandlar}
            name="Print list"
            icon={<PrintIcon />}
          />
        </ul>
      </div>
    </div>
  );
};

const TasksListActionsModal = ({
  onClose,
  coordinates,
}: TasksListsActionsProps) => {
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
