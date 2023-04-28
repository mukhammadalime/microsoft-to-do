import XIcon from "../../Icons/XIcon";
import SearchIcon from "../../Icons/SearchIcon";
import { useEffect, useRef, useState } from "react";
import useWindowWidth from "../../hooks/useWindowWidth";
import Tooltip from "../Tooltips/Tooltip";
import { CoordinatesTypes } from "../../types/designTypes";

const HeaderSearch = () => {
  const windowWidth = useWindowWidth();
  const searchRef = useRef<HTMLDivElement>(null);
  const searchIconRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [searchTimerID, setSearchTimerID] = useState<NodeJS.Timeout>();
  const [exitTimerID, setExitTimerID] = useState<NodeJS.Timeout>();
  const [searchHovered, setSearchHovered] = useState<boolean>(false);
  const [searchTooltipCoordinates, setSearchTooltipCoordinates] =
    useState<CoordinatesTypes>({ x: 0, y: 0 });
  const [exitSearchTooltipCoordinates, setExitSearchTooltipCoordinates] =
    useState<CoordinatesTypes>({ x: 0, y: 0 });
  const [exitSearchHovered, setExitSearchHovered] = useState<boolean>(false);

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      if (
        !searchRef.current!.contains(e.target as HTMLDivElement) &&
        !inputRef.current?.value
      ) {
        showInput ? setSearchHovered(true) : setSearchHovered(false);
        setShowInput(false);
      }
    };

    document.addEventListener("mousedown", outsideClickHandler);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, [showInput]);

  // SHOW SEARCH INPUT
  const showSearchInput = (): void => {
    // We clear search timeout because we do not want search tooltip to show up after clicking search input in less than 400 ms
    clearTimeout(searchTimerID);
    setSearchHovered(false);
    if (!showInput) {
      setShowInput(true);
      setTimeout(() => inputRef.current!.focus(), 0);
    }
  };

  // SHOW SEARCH TOOLTIP
  const onSearchMouseEnter = () => {
    const tooltipHost = document.querySelector(
      ".search-tooltip-host"
    ) as HTMLDivElement;
    const searchTooltipPosition = tooltipHost.getBoundingClientRect();
    setSearchTooltipCoordinates({
      x: searchTooltipPosition.left,
      y: searchTooltipPosition.top,
    });

    if (!showInput) {
      const id = setTimeout(() => setSearchHovered(true), 400);
      setSearchTimerID(id);
    }
  };
  const onSearchMouseLeave = () => {
    clearTimeout(searchTimerID);
    setSearchHovered(false);
  };

  // ON EXIT SEARCH MOUSE ENTER
  const onExitSearchMouseEnter = () => {
    const exitTooltipHost = document.querySelector(
      ".exit-tooltip-host"
    ) as HTMLDivElement;
    const exitSearchTooltipPosition = exitTooltipHost.getBoundingClientRect();
    setExitSearchTooltipCoordinates({
      x: exitSearchTooltipPosition.left,
      y: 0,
    });

    const id = setTimeout(() => setExitSearchHovered(true), 300);
    setExitTimerID(id);
  };

  // ON EXIT SEARCH MOUSE LEAVE
  const onExitSearchMouseLeave = () => {
    clearTimeout(exitTimerID);
    setExitSearchHovered(false);
  };

  return (
    <>
      <div className="search-container">
        <div
          className={`header__search${
            showInput && windowWidth <= 550 ? " search-clicked" : ""
          }`}
          onClick={showSearchInput}
          ref={searchRef}
          onMouseEnter={onSearchMouseEnter}
          onMouseLeave={onSearchMouseLeave}
          style={{
            width: windowWidth <= 900 && showInput ? "100%" : "",
            maxWidth: windowWidth <= 900 && showInput ? "100%" : "",
          }}
        >
          <div className="search-tooltip-host">
            <button className="header__search--icon" ref={searchIconRef}>
              <SearchIcon />
            </button>
          </div>

          {showInput && (
            <div className="header__search--input">
              <input ref={inputRef} type="text" placeholder="Search" />

              <div className="exit-tooltip-host">
                <button
                  onClick={() => setShowInput(false)}
                  onMouseEnter={onExitSearchMouseEnter}
                  onMouseLeave={onExitSearchMouseLeave}
                >
                  <XIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {searchHovered && (
        <Tooltip
          content="Search"
          tooltipPosition={{
            x: searchTooltipCoordinates.x - 66,
            y: searchTooltipCoordinates.y,
          }}
          trianglePosition={{
            top: "8px",
            right: "-8px",
          }}
        />
      )}

      {exitSearchHovered && (
        <Tooltip
          content="Exit search"
          tooltipPosition={{
            x: exitSearchTooltipCoordinates.x - 22,
            y: 51,
          }}
          trianglePosition={{
            top: "-7px",
            left: "29.5px",
          }}
        />
      )}
    </>
  );
};

export default HeaderSearch;
