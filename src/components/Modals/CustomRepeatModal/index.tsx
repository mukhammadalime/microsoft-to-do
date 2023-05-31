import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import ModalWrapper from "../../ModalWrapper";
import { useAppSelector } from "../../../hooks/useReduxHooks";

interface CustomRepeatProps {
  onClose: () => void;
}

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const CustomRepeatOverlay = ({ onClose }: CustomRepeatProps) => {
  const customRepeatRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<HTMLInputElement>(null);
  const [everyTimeType, setEveryTimeType] = useState<string>("weeks");
  const [everyNumberWeekDays, setEveryNumberWeekDays] = useState<string[]>([]);

  const { coordinates } = useAppSelector(
    (state) => state.modals.customRepeatModal
  );

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      if (!customRepeatRef.current!.contains(e.target as HTMLDivElement)) {
        onClose();
      }
    };

    document.addEventListener("click", outsideClickHandler, true);
    return () => {
      document.removeEventListener("click", outsideClickHandler, true);
    };
  }, [onClose]);

  const onSaveHandler = () => {
    const intervalRefInput = intervalRef.current!.value;
  };

  const onSelectTimeHandler = (e: any) => {
    console.log(e.target.value);
    setEveryTimeType(e.target.value);
  };

  const onSelectWeekDaysHandler = (day: string) => {
    if (everyNumberWeekDays.includes(day)) {
      setEveryNumberWeekDays((prevState) => {
        return everyNumberWeekDays.length !== 1
          ? prevState.filter((item) => item !== day)
          : prevState;
      });
      return;
    }
    setEveryNumberWeekDays((prevState) => {
      return [...prevState, day];
    });
  };

  // This helps to position the modal when the modal width changes
  const minusCoordinates = everyTimeType === "weeks" ? 38 : 0;

  return (
    <div
      className="actions-modal custom-repeat-modal"
      style={{
        left: coordinates.x - minusCoordinates,
        top: coordinates.y + 11,
      }}
      ref={customRepeatRef}
    >
      <div
        className="triangle"
        style={{
          left: everyTimeType === "weeks" ? "130px" : "92px",
          top: "-8px",
        }}
      />
      <div className="layer-box" />

      <div className="custom-repeat">
        <div className="custom-repeat__options">
          <div className="custom-repeat__options--type">
            <div className="custom-repeat__options--interval">
              <input
                type="number"
                min="1"
                max="999"
                defaultValue="1"
                ref={intervalRef}
              />
            </div>
            <div className="custom-repeat__options--select">
              <select value={everyTimeType} onChange={onSelectTimeHandler}>
                <option value="days">days</option>
                <option value="weeks">weeks</option>
                <option value="months">months</option>
                <option value="years">years</option>
              </select>
            </div>
          </div>

          {everyTimeType === "weeks" && (
            <div className="custom-repeat__options--days">
              {weekdays.map((day: string) => (
                <button
                  className={everyNumberWeekDays.includes(day) ? "active" : ""}
                  children={day.slice(0, 2)}
                  key={day}
                  onClick={onSelectWeekDaysHandler.bind(this, day)}
                />
              ))}
            </div>
          )}
        </div>

        <button
          className="btn-blue custom-repeat__actions"
          onClick={onSaveHandler}
          disabled={
            everyTimeType === "weeks" && everyNumberWeekDays.length >= 1
              ? false
              : everyTimeType !== "weeks"
              ? false
              : true
          }
          children={<span>Save</span>}
        />
      </div>
    </div>
  );
};

const CustomRepeatModal = ({ onClose }: CustomRepeatProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalWrapper>
          <CustomRepeatOverlay onClose={onClose} />
        </ModalWrapper>,
        document.getElementById("modal-wrapper") as HTMLDivElement
      )}
    </>
  );
};

export default CustomRepeatModal;
