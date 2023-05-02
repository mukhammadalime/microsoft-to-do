import MyAccount from "./MyAccount";
import QuestionIcon from "../../Icons/QuestionIcon";
import { useEffect, useRef, useState } from "react";
import SettingsIcon from "../../Icons/SettingsIcon";
import NotificationsIcon from "../../Icons/NotificationsIcon";
import {
  HeaderActionsTypes,
  HeaderButtonsTypes,
} from "../../types/designTypes";

const HeaderActions = () => {
  const avatarRef = useRef<HTMLButtonElement>(null);
  const myAccountRef = useRef<HTMLDivElement>(null);
  const [btnsClicked, setBtnsClicked] = useState<HeaderButtonsTypes>({
    settings: false,
    help: false,
    notifications: false,
    avatar: false,
  });

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      const eventTarget = e.target as HTMLDivElement;
      if (
        avatarRef.current!.contains(eventTarget) ||
        (btnsClicked.avatar && myAccountRef.current!.contains(eventTarget))
      ) {
        return;
      }

      setBtnsClicked((prevState) => {
        return { ...prevState, avatar: false };
      });
    };

    document.addEventListener("mousedown", outsideClickHandler, true);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler, true);
    };
  }, [btnsClicked.avatar]);

  // HANDLING BUTTONS CLICKS
  const handleButtonsClicks = (clickedBtn: HeaderActionsTypes) => {
    // This function set all values false except the clicked one
    const filterObj = (obj: HeaderButtonsTypes) => {
      const copiedObj: any = obj;
      const newObj: any = {};

      Object.keys(obj).forEach((el) => {
        if (clickedBtn.toLowerCase() === el) {
          // If the same button is clicke again, it makes the clicked button false
          copiedObj[el] ? (newObj[el] = false) : (newObj[el] = true);
        } else newObj[el] = false;
      });
      return newObj;
    };
    setBtnsClicked(filterObj(btnsClicked));
  };

  return (
    <div className="header__actions">
      <button
        className={`${btnsClicked.settings ? "settings-clicked" : ""}`}
        onClick={handleButtonsClicks.bind(null, "SETTINGS")}
        children={<SettingsIcon />}
      />
      <button
        className={`${btnsClicked.help ? "others-clicked" : ""}`}
        onClick={handleButtonsClicks.bind(null, "HELP")}
        children={<QuestionIcon />}
      />
      <button
        className={`${btnsClicked.notifications ? "others-clicked" : ""}`}
        onClick={handleButtonsClicks.bind(null, "NOTIFICATIONS")}
      >
        <NotificationsIcon />
        <div>3</div>
      </button>

      <button
        onClick={handleButtonsClicks.bind(null, "AVATAR")}
        ref={avatarRef}
        children={
          <img className="avatar" src="/assets/images/default.jpg" alt="" />
        }
      />

      {btnsClicked.avatar && (
        <MyAccount clicked={btnsClicked.avatar} ref={myAccountRef} />
      )}
    </div>
  );
};

export default HeaderActions;
