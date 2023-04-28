import { CoordinatesTypes } from "../../types/designTypes";
import ReactDOM from "react-dom";
import ModalWrapper from "../ModalWrapper";

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
  return (
    <div
      className="tooltip"
      style={{
        left: tooltipPosition.x,
        top: tooltipPosition.y,
      }}
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
