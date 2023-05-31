import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import ModalActionItem from "../../ModalActionItem";
import DueTodayIcon from "../../../Icons/DueTodayIcon";
import ModalWrapper from "../../ModalWrapper";
import RemoveIcon from "../../../Icons/RemoveIcon";
import NextWeekIcon from "../../../Icons/NextWeekIcon";
import PickDateIcon from "../../../Icons/PickDateIcon";
import TrashIcon2 from "../../../Icons/TrashIcon2";
import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";

import { initialCoordinatesState } from "../../../data/initialStates";
import {
  calendarModalToggler,
  dueDateModalToggler,
} from "../../../store/reducers/modalsReducer";

interface DueDateOptionsProps {
  onClose: () => void;
}

const DueDateOverlay = ({ onClose }: DueDateOptionsProps) => {
  const dueDateOptionsRef = useRef<HTMLDivElement>(null);
  const [defaultHoverFirstAction, setDefaultHoverFirstAction] =
    useState<boolean>(true);
  /// REDUX
  const dispatch: any = useAppDispatch();
  const { dueDateModal } = useAppSelector((state) => state.modals);

  const dueDateText = "";

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      if (!dueDateOptionsRef.current!.contains(e.target as HTMLDivElement)) {
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
    <>
      <div
        className="actions-modal"
        style={{
          left: dueDateModal.coordinates ? dueDateModal.coordinates.x : 0,
          top: dueDateModal.coordinates ? dueDateModal.coordinates.y : 0,
        }}
        ref={dueDateOptionsRef}
      >
        <div className="actions-modal__header">Due</div>
        <ul>
          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterHandlar}
            name="Today"
            icon={<DueTodayIcon />}
            defaultHoverFirstAction={defaultHoverFirstAction}
            rightText="Mon"
          />

          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterHandlar}
            name="Tomorrow"
            icon={<RemoveIcon />}
            rightText="Tue"
          />

          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterHandlar}
            name="Next week"
            icon={<NextWeekIcon />}
            rightText="Mon"
          />

          <div className="seperator"></div>

          <ModalActionItem
            onClickHandler={() => {
              dispatch(
                calendarModalToggler({
                  open: true,
                  coordinates: {
                    x: dueDateModal.coordinates.x,
                    y: dueDateModal.coordinates.y,
                  },
                })
              );
              dispatch(dueDateModalToggler({ open: false }));
            }}
            onMouseEnter={onMouseEnterHandlar}
            name="Pick a date"
            icon={<PickDateIcon />}
          />

          {dueDateText && (
            <>
              <div className="seperator"></div>

              <ModalActionItem
                onClickHandler={() => {}}
                onMouseEnter={onMouseEnterHandlar}
                name="Remove due date"
                icon={<TrashIcon2 />}
                className="delete-row"
              />
            </>
          )}
        </ul>
      </div>
    </>
  );
};

const DueDateModal = ({ onClose }: DueDateOptionsProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper>
          <DueDateOverlay onClose={onClose} />
        </ModalWrapper>,
        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default DueDateModal;
