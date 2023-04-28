import { ReactElement } from "react";
import ChevronRightIcon from "../Icons/ChevronRightIcon";

interface ModalActionItemTypes {
  onMouseEnter: () => void;
  onClickHandler: () => void;
  onMouseLeave?: () => void;
  name: string;
  hovered?: boolean;
  rightIcon?: boolean;
  icon: ReactElement;
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
}: ModalActionItemTypes) => {
  return (
    <li>
      <button
        onClick={onClickHandler}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`${className} ${hovered ? "action-hovered" : ""}`}
        style={{
          backgroundColor: defaultHoverFirstAction ? "#f5f5f5" : "",
        }}
      >
        <i>{icon}</i>
        <span>{name}</span>
        {rightIcon && <ChevronRightIcon />}
      </button>
    </li>
  );
};

export default ModalActionItem;
