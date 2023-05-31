import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import { CoordinatesTypes } from "../../../types/designTypes";
import ModalActionItem from "../../ModalActionItem";
import ModalWrapper from "../../ModalWrapper";
import PickDateIcon from "../../../Icons/PickDateIcon";
import ClockArrowDownIcon from "../../../Icons/ClockArrowDownIcon";
import ClockOneArrowRightIcon from "../../../Icons/ClockOneArrowRightIcon";
import ClockTwoArrowsRightIcon from "../../../Icons/ClockTwoArrowsRightIcon";
import TrashIcon2 from "../../../Icons/TrashIcon2";
import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";

import { initialCoordinatesState } from "../../../data/initialStates";
import {
  calendarModalToggler,
  remindMeModalToggler,
} from "../../../store/reducers/modalsReducer";

interface RemindMeOptionsProps {
  onClose: () => void;
}

const RemindMeOverlay = ({ onClose }: RemindMeOptionsProps) => {
  const remindMeOptions = useRef<HTMLDivElement>(null);
  const [defaultHoverFirstAction, setDefaultHoverFirstAction] =
    useState<boolean>(true);

  /// REDUX
  const dispatch: any = useAppDispatch();
  const { remindMeModal } = useAppSelector((state) => state.modals);

  const remindMeText = "2";
  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      if (!remindMeOptions.current!.contains(e.target as HTMLDivElement)) {
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
          left: remindMeModal.coordinates ? remindMeModal.coordinates.x : 0,
          top: remindMeModal.coordinates ? remindMeModal.coordinates.y : 0,
        }}
        ref={remindMeOptions}
      >
        <div className="actions-modal__header">Reminder</div>

        <ul>
          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterHandlar}
            name="Later today"
            icon={<ClockArrowDownIcon />}
            defaultHoverFirstAction={defaultHoverFirstAction}
            rightText="5:00 AM"
          />

          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterHandlar}
            name="Tomorrow"
            icon={<ClockOneArrowRightIcon />}
            rightText="Tue, 9 AM"
          />

          <ModalActionItem
            onClickHandler={() => {}}
            onMouseEnter={onMouseEnterHandlar}
            name="Next week"
            icon={<ClockTwoArrowsRightIcon />}
            rightText="Mon, 9 AM"
          />

          <div className="seperator"></div>

          <ModalActionItem
            onClickHandler={() => {
              dispatch(
                calendarModalToggler({
                  open: true,
                  coordinates: {
                    x: remindMeModal.coordinates.x + 11,
                    y: remindMeModal.coordinates.y,
                  },
                  timeForCalendar: true,
                })
              );
              dispatch(
                remindMeModalToggler({
                  open: false,
                })
              );
            }}
            onMouseEnter={onMouseEnterHandlar}
            name="Pick a date & time"
            icon={<PickDateIcon />}
          />

          {remindMeText && (
            <>
              <div className="seperator"></div>

              <ModalActionItem
                onClickHandler={() => {}}
                onMouseEnter={onMouseEnterHandlar}
                name="Remove reminder"
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

const RemindMeModal = ({ onClose }: RemindMeOptionsProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper>
          <RemindMeOverlay onClose={onClose} />
        </ModalWrapper>,
        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default RemindMeModal;
