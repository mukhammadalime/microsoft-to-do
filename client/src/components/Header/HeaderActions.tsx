import { useEffect, useRef, useState } from "react";
import SettingsIcon from "../../Icons/SettingsIcon";
import QuestionIcon from "../../Icons/QuestionIcon";
import NotificationsIcon from "../../Icons/NotificationsIcon";
import { ActionType, ButtonsTypes } from "../../types/designTypes";
import MyAccount from "./MyAccount";

const HeaderActions = () => {
  const avatarRef = useRef<HTMLButtonElement>(null);
  const myAccountRef = useRef<HTMLDivElement>(null);
  const [btnsClicked, setBtnsClicked] = useState<ButtonsTypes>({
    settings: false,
    help: false,
    notifications: false,
    avatar: false,
  });

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: any) => {
      if (
        avatarRef.current!.contains(e.target) ||
        myAccountRef.current!.contains(e.target)
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
  }, []);

  // HANDLING BUTTONS CLICKS
  const handleButtonsClicks = (clickedBtn: ActionType) => {
    // This function set all values false except the clicked one
    const filterObj = (obj: ButtonsTypes) => {
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
      >
        <img className="avatar" src="./assets/images/default.jpg" alt="" />
      </button>
      <MyAccount clicked={btnsClicked.avatar} ref={myAccountRef} />
    </div>
  );
};

export default HeaderActions;
