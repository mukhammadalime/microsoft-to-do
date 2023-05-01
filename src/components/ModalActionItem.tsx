import { ReactElement } from "react";
import ChevronRightIcon from "../Icons/ChevronRightIcon";

interface ModalActionItemTypes {
  onMouseEnter: () => void;
  onClickHandler: () => void;
  onMouseLeave?: () => void;
  name: string;
  hovered?: boolean;
  rightIcon?: boolean;
  icon?: ReactElement;
  rightText?: string;
  defaultHoverFirstAction?: boolean;
  className?: string;
}

const ModalActionItem = ({
  onMouseEnter,
  hovered,
  rightIcon,
  name,
  icon,
  onClickHandler,
  defaultHoverFirstAction,
  className,
  onMouseLeave,
  rightText,
}: ModalActionItemTypes) => {
  return (
    <li>
      <button
        onClick={onClickHandler}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`${className ? className : ""}${
          hovered ? " action-hovered" : ""
        }`}
        style={{
          backgroundColor: defaultHoverFirstAction ? "#f5f5f5" : "",
        }}
      >
        {icon && <i>{icon}</i>}
        <span className="primaryText">{name}</span>
        {rightIcon && <ChevronRightIcon />}
        {rightText && <span className="rightText">{rightText}</span>}
      </button>
    </li>
  );
};

export default ModalActionItem;
