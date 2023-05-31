import { ReactElement } from "react";

interface HelperButtonPropsTypes {
  className: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  additionalText?: string;
  icon: ReactElement;
}

const HelperButton = ({
  className,
  onMouseEnter,
  onMouseLeave,
  onClick,
  additionalText,
  icon,
}: HelperButtonPropsTypes) => {
  return (
    <div className={className}>
      <button
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <div
          className={`addingTask-container${
            additionalText ? " additional-text-added" : ""
          }`}
        >
          {icon}
          {additionalText && (
            <div className="additional-text">
              <span>{additionalText}</span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default HelperButton;
