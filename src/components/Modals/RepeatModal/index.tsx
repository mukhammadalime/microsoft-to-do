import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import ModalActionItem from "../../ModalActionItem";
import ModalWrapper from "../../ModalWrapper";
import PickDateIcon from "../../../Icons/PickDateIcon";
import DailyIcon from "../../../Icons/DailyIcon";
import WeekdaysIcon from "../../../Icons/WeekdaysIcon";
import WeeklyIcon from "../../../Icons/WeeklyIcon";
import CalendarIcon from "../../../Icons/CalendarIcon";
import YearlyIcon from "../../../Icons/YearlyIcon";
import TrashIcon2 from "../../../Icons/TrashIcon2";
import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";
import { customRepeatModalToggle } from "../../../store/action-creators/modalsActions";
import { repeatModalToggle } from "../../../store/action-creators/modalsActions";

interface RepeatOptionsProps {
  onClose: () => void;
}

const RepeatOverlay = ({ onClose }: RepeatOptionsProps) => {
  const remindMeOptions = useRef<HTMLDivElement>(null);
  const [defaultHoverFirstAction, setDefaultHoverFirstAction] =
    useState<boolean>(true);

  const dispatch = useAppDispatch();
  const { repeatModal, customRepeatModal } = useAppSelector(
    (state) => state.modals
  );

  const repeatText = "";

  const onMouseEnterHandlar = () => setDefaultHoverFirstAction(false);

  const openCustomRepeatModal = () => {
    dispatch(
      customRepeatModalToggle(true, {
        x: repeatModal.coordinates.x,
        y: repeatModal.coordinates.y,
      })
    );
    dispatch(repeatModalToggle(false));
  };

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      const customRepeatModal = document.querySelector(
        ".custom-repeat-modal"
      ) as HTMLDivElement;
      if (
        !remindMeOptions.current!.contains(e.target as HTMLDivElement) &&
        !customRepeatModal?.contains(e.target as HTMLDivElement)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", outsideClickHandler, true);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler, true);
    };
  }, [onClose]);

  return (
    <div
      className="actions-modal"
      style={{
        left: repeatModal.coordinates.x ?? 0,
        top: repeatModal.coordinates.y ?? 0,
      }}
      ref={remindMeOptions}
    >
      <div className="actions-modal__header">Repeat</div>

      <ul>
        <ModalActionItem
          onClickHandler={() => {}}
          onMouseEnter={onMouseEnterHandlar}
          name="Daily"
          icon={<DailyIcon />}
          defaultHoverFirstAction={defaultHoverFirstAction}
        />

        <ModalActionItem
          onClickHandler={() => {}}
          onMouseEnter={onMouseEnterHandlar}
          name="Weekdays"
          icon={<WeekdaysIcon />}
        />

        <ModalActionItem
          onClickHandler={() => {}}
          onMouseEnter={onMouseEnterHandlar}
          name="Weekly"
          icon={<WeeklyIcon />}
        />
        <ModalActionItem
          onClickHandler={() => {}}
          onMouseEnter={onMouseEnterHandlar}
          name="Monthly"
          icon={<CalendarIcon />}
        />
        <ModalActionItem
          onClickHandler={() => {}}
          onMouseEnter={onMouseEnterHandlar}
          name="Yearly"
          icon={<YearlyIcon />}
        />

        <div className="seperator"></div>

        <ModalActionItem
          onClickHandler={openCustomRepeatModal}
          onMouseEnter={onMouseEnterHandlar}
          name="Custom"
          icon={<PickDateIcon />}
          hovered={customRepeatModal.open}
          className="custom-repeat-row"
        />

        {repeatText && (
          <>
            <div className="seperator"></div>

            <ModalActionItem
              onClickHandler={() => {}}
              onMouseEnter={onMouseEnterHandlar}
              name="Never repeat"
              icon={<TrashIcon2 />}
              className="delete-row"
            />
          </>
        )}
      </ul>
    </div>
  );
};

const RepeatModal = ({ onClose }: RepeatOptionsProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper>
          <RepeatOverlay onClose={onClose} />
        </ModalWrapper>,
        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default RepeatModal;
