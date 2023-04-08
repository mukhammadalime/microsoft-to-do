import { useState } from "react";
import SettingsIcon from "../../Icons/SettingsIcon";
import QuestionIcon from "../../Icons/QuestionIcon";
import NotificationsIcon from "../../Icons/NotificationsIcon";
import { ActionType, ButtonsTypes } from "../../types/headerTypes";

const HeaderActions = () => {
  const [btnsClicked, setBtnsClicked] = useState<ButtonsTypes>({
    settings: false,
    help: false,
    notifications: false,
    avatar: false,
  });

  // HANDLING BUTTONS CLICKS
  const handleButtonsClicks = (clickedBtn: ActionType) => {
    // This function set all values false except the clicked one
    const filterObj = (obj: ButtonsTypes) => {
      const newObj: any = {};
      Object.keys(obj).forEach((el) => {
        if (clickedBtn.toLowerCase() === el) newObj[el] = true;
        else newObj[el] = false;
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
      <button onClick={handleButtonsClicks.bind(null, "AVATAR")}>
        <img src="./assets/images/default.jpg" alt="" />
      </button>
    </div>
  );
};

export default HeaderActions;
