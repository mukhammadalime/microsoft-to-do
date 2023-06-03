import { CoordinatesTypes } from "../../../types/designTypes";
import ReactDOM from "react-dom";
import ModalWrapper from "../../ModalWrapper";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "../../../hooks/useReduxHooks";
import { sortTooltipToggler } from "../../../store/reducers/tooltipsReducer";

interface TooltipPropsTypes {
  content: string;
  tooltipPosition: CoordinatesTypes;
  trianglePosition: {
    top?: string;
    bottom?: string;
    right?: string;
    left?: string;
  };
}

const TooltipOverlay = ({
  content,
  tooltipPosition,
  trianglePosition,
}: TooltipPropsTypes) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const sortTooltipHost = document.querySelector(
      ".sort-tooltip-host"
    ) as HTMLDivElement;

    const outsideClickHandler = (e: MouseEvent) => {
      if (!sortTooltipHost.contains(e.target as HTMLDivElement)) {
        dispatch(sortTooltipToggler({ open: false }));
      }
    };

    document.addEventListener("click", outsideClickHandler, true);
    return () => {
      document.removeEventListener("click", outsideClickHandler, true);
    };
  }, [dispatch]);

  return (
    <div
      className="tooltip"
      style={{
        left: tooltipPosition.left,
        top: tooltipPosition.top,
      }}
      ref={tooltipRef}
    >
      <div
        className="triangle"
        style={{
          top: trianglePosition.top ?? "unset",
          bottom: trianglePosition.bottom ?? "unset",
          right: trianglePosition.right ?? "unset",
          left: trianglePosition.left ?? "unset",
        }}
      ></div>
      <div className="layer-box"></div>
      <div className="tooltip__main">
        <div className="tooltip__main--content">
          <span>{content}</span>
        </div>
      </div>
    </div>
  );
};

const Tooltip = ({
  content,
  tooltipPosition,
  trianglePosition,
}: TooltipPropsTypes) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper>
          <TooltipOverlay
            content={content}
            tooltipPosition={tooltipPosition}
            trianglePosition={trianglePosition}
          />
        </ModalWrapper>,
        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default Tooltip;
