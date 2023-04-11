import ReactDOM from "react-dom";
import DotsIcon from "../../Icons/DotsIcon";
import { useEffect, useRef, useState } from "react";
import AllAppsView from "./AllAppsView";
import MainApps from "./MainApps";
import { AppsLauncherTypes } from "../../types/designTypes";

const AppsLauncher = ({ onClose, opened }: AppsLauncherTypes) => {
  const appLauncherRef = useRef<HTMLDivElement>(null);
  const [showAllApps, setShowAllApps] = useState(() => false);

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      if (appLauncherRef.current!.contains(e.target as HTMLDivElement)) return;
      onClose();
    };

    document.addEventListener("click", outsideClickHandler, true);
    return () => {
      document.removeEventListener("click", outsideClickHandler, true);
    };
  }, [onClose]);

  return (
    <div
      className={`_365Apps${opened ? " _365Apps-clicked" : ""}`}
      ref={appLauncherRef}
    >
      <div className="_365Apps__header">
        <button onClick={onClose}>
          <DotsIcon black />
        </button>

        <div>
          <span>Microsoft 365</span>
          <img src="./assets/icons/arrow-right.svg" alt="" />
        </div>
      </div>

      {!showAllApps && <MainApps onOpenAllApps={() => setShowAllApps(true)} />}
      {showAllApps && <AllAppsView onClose={() => setShowAllApps(false)} />}
    </div>
  );
};

const AppsLauncherModal = ({ onClose, opened }: AppsLauncherTypes) => {
  return (
    <>
      {ReactDOM.createPortal(
        <AppsLauncher onClose={onClose} opened={opened} />,
        document.getElementById("appLauncher") as HTMLDivElement
      )}
    </>
  );
};

export default AppsLauncherModal;
