import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import ModalActionItem from "../../ModalActionItem";
import ModalWrapper from "../../ModalWrapper";
import PickDateIcon from "../../../Icons/PickDateIcon";
import CalendarIcon from "../../../Icons/CalendarIcon";
import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";
import StarIcon from "../../../Icons/StarIcon";
import SunIcon from "../../../Icons/SunIcon";
import OrderIcon from "../../../Icons/OrderIcon";
import { sortTooltipToggler } from "../../../store/reducers/tooltipsReducer";

interface SortProps {
  onClose: () => void;
}

const SortOverlay = ({ onClose }: SortProps) => {
  const sortOptionsRef = useRef<HTMLDivElement>(null);
  const [defaultHoverFirstAction, setDefaultHoverFirstAction] =
    useState<boolean>(true);

  const dispatch = useAppDispatch();
  const { sortModal } = useAppSelector((state) => state.modals);

  const onMouseEnterHandlar = () => setDefaultHoverFirstAction(false);

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const sortTooltipHost = document.querySelector(
      ".sort-tooltip-host"
    ) as HTMLDivElement;

    const outsideClickHandler = (e: MouseEvent) => {
      if (
        !sortOptionsRef.current!.contains(e.target as HTMLDivElement) &&
        !sortTooltipHost?.contains(e.target as HTMLDivElement)
      ) {
        onClose();
        setTimeout(() => dispatch(sortTooltipToggler({ open: true })), 300);
      }
    };

    const hideDefaultHoverFirstAction = () => {
      setDefaultHoverFirstAction(false);
    };

    document.addEventListener("click", outsideClickHandler, true);
    document.addEventListener("mousedown", hideDefaultHoverFirstAction, true);
    return () => {
      document.removeEventListener("click", outsideClickHandler, true);
      document.addEventListener("mousedown", hideDefaultHoverFirstAction, true);
    };
  }, [onClose, dispatch]);

  return (
    <div
      className="actions-modal"
      style={{
        left: sortModal.coordinates.left ?? 0,
        top: sortModal.coordinates.top ?? 0,
      }}
      ref={sortOptionsRef}
    >
      <div className="actions-modal__header">Sort by</div>

      <ul>
        <ModalActionItem
          onClickHandler={() => {}}
          onMouseEnter={onMouseEnterHandlar}
          name="Importance"
          icon={<StarIcon />}
          defaultHoverFirstAction={defaultHoverFirstAction}
        />

        <ModalActionItem
          onClickHandler={() => {}}
          onMouseEnter={onMouseEnterHandlar}
          name="Due Date"
          icon={<CalendarIcon />}
        />

        <ModalActionItem
          onClickHandler={() => {}}
          onMouseEnter={onMouseEnterHandlar}
          name="Added to My Day"
          icon={<SunIcon />}
        />
        <ModalActionItem
          onClickHandler={() => {}}
          onMouseEnter={onMouseEnterHandlar}
          name="Alphabetically"
          icon={<OrderIcon />}
        />
        <ModalActionItem
          onClickHandler={() => {}}
          onMouseEnter={onMouseEnterHandlar}
          name="Creation date"
          icon={<PickDateIcon />}
        />
      </ul>
    </div>
  );
};

const SortModal = ({ onClose }: SortProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper>
          <SortOverlay onClose={onClose} />
        </ModalWrapper>,
        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default SortModal;
