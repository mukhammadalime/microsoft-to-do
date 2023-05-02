import { useRef, useState } from "react";
import SearchIcon from "../../Icons/SearchIcon";
import XIcon from "../../Icons/XIcon";
import { _365Apps, moreFromMicrosoft } from "../../data/micorost-apps";
import AppItem from "./AppItem";
import { _365AppsTypes } from "../../types/designTypes";

const AllAppsView = ({ onClose }: { onClose: () => void }) => {
  const [searchInput, setSearchInput] = useState<string>(() => "");
  const searchRef = useRef<HTMLInputElement>(null);
  const _365AppsCopy = _365Apps.slice();

  return (
    <div className="allApps">
      <button className="allApps__back" onClick={onClose}>
        <img src="/assets/icons/arrow-right.svg" alt="" />
        <span>Back</span>
      </button>

      <div className="allApps__search">
        <button>
          {searchInput ? (
            <div
              onClick={() => {
                setSearchInput("");
                searchRef.current!.value = "";
              }}
            >
              <XIcon />
            </div>
          ) : (
            <SearchIcon />
          )}
        </button>

        <input
          type="text"
          placeholder="Search all of your apps"
          onChange={(e) => setSearchInput(e.target.value)}
          ref={searchRef}
        />
      </div>

      <div className="allApps__main">
        {searchInput && (
          <div className="allApps__items">
            {_365Apps
              .concat(moreFromMicrosoft)
              .filter((app) => app.name.toLowerCase().includes(searchInput))
              .map((app: _365AppsTypes) => (
                <AppItem {...app} key={app.name} />
              ))}
          </div>
        )}

        {!searchInput && (
          <>
            <div className="allApps__items">
              <h3>Apps</h3>

              {_365AppsCopy
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((app) => (
                  <AppItem {...app} key={app.name} />
                ))}
            </div>

            <div className="allApps__more">
              <h3>More from Microsoft</h3>

              {moreFromMicrosoft.map((app) => (
                <AppItem {...app} key={app.name} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="allApps__bottom">
        <img src="/assets/icons/arrow-right.svg" alt="" />
        <span>Explore all your apps</span>
      </div>
    </div>
  );
};

export default AllAppsView;
