import { useState } from "react";
import SearchIcon from "../../Icons/SearchIcon";
import XIcon from "../../Icons/XIcon";
import { _365Apps, moreFromMicrosoft } from "../../data/micorost-apps";

const AllAppsView = ({ onClose }: { onClose: () => void }) => {
  const [searchInput, setSearchInput] = useState<string>(() => "");

  return (
    <div className="allApps">
      <button className="allApps__back" onClick={onClose}>
        <img src="./assets/icons/arrow-right.svg" alt="" />
        <span>Back</span>
      </button>

      <div className="allApps__search">
        <button>
          {searchInput ? (
            <XIcon color="#252423" />
          ) : (
            <SearchIcon color="#252423" />
          )}
        </button>

        <input
          type="text"
          placeholder="Search all of your apps"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className="allApps__main">
        <div className="allApps__items">
          <h3>Apps</h3>

          {_365Apps
            .sort((a, b) => (a.name === b.name ? 0 : a.name < b.name ? -1 : 1))
            .map((app) => (
              <a href={app.link} className="appContainer" key={app.name}>
                <img
                  src={`./assets/images/365Apps/microsoft-${app.imgLocation}`}
                  alt=""
                />
                <span>{app.name}</span>
              </a>
            ))}
        </div>

        <div className="allApps__more">
          <h3>More from Microsoft</h3>

          {moreFromMicrosoft.map((app) => (
            <a href={app.link} className="appContainer" key={app.name}>
              <img
                src={`./assets/images/365Apps/microsoft-${app.imgLocation}`}
                alt=""
              />
              <span>{app.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="allApps__bottom">
        <img src="./assets/icons/arrow-right.svg" alt="" />
        <span>Explore all your apps</span>
      </div>
    </div>
  );
};

export default AllAppsView;
