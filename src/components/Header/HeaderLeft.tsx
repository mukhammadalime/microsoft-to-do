import { useState } from "react";
import DotsIcon from "../../Icons/DotsIcon";
import AppsLauncherModal from "../365Apps/AppsLauncherModal";

const HeaderLeft = () => {
  const [show365Apps, setShow365Apps] = useState(() => false);

  return (
    <>
      <div className="header__left">
        <button
          className="header__apps-btn"
          onClick={() => setShow365Apps(true)}
          children={<DotsIcon />}
        />

        <div className="header__left--todo">
          <a href="localhost:3000">
            <span>To Do</span>
          </a>
        </div>
      </div>

      {show365Apps && (
        <AppsLauncherModal
          onClose={() => setShow365Apps(false)}
          opened={show365Apps}
        />
      )}
    </>
  );
};

export default HeaderLeft;
