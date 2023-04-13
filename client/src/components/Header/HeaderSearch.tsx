import XIcon from "../../Icons/XIcon";
import SearchIcon from "../../Icons/SearchIcon";
import { useEffect, useRef, useState } from "react";
import useWindowWidth from "../../hooks/useWindowWidth";

const HeaderSearch = () => {
  const windowWidth = useWindowWidth();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showInput, setShowInput] = useState<boolean>(() => false);
  const [timerID, setTimerID] = useState<NodeJS.Timeout>();
  const [timer2ID, setTimer2ID] = useState<NodeJS.Timeout>();
  const [searchHovered, setSearchHovered] = useState<boolean>(() => false);
  const [exitSearchHovered, setExitSearchHovered] = useState<boolean>(
    () => false
  );

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
  }, [showInput, timer2ID]);

  // SHOW SEARCH INPUT
  const showSearchInput = (): void => {
    clearTimeout(timerID);
    setExitSearchHovered(false);
    if (!showInput) {
      setShowInput(true);
      setTimeout(() => inputRef.current!.focus(), 0);
    }
  };

  // SHOW SEARCH TOOLTIP
  const onSearchMouseEnter = () => {
    if (!showInput) {
      const id = setTimeout(() => setSearchHovered(true), 400);
      setTimerID(id);
    }
  };
  const onSearchMouseLeave = () => {
    clearTimeout(timerID);
    setSearchHovered(false);
  };

  // ON EXIT SEARCH MOUSE ENTER
  const onExitSearchMouseEnter = () => {
    const id = setTimeout(() => setExitSearchHovered(true), 300);
    setTimer2ID(id);
  };

  // ON EXIT SEARCH MOUSE LEAVE
  const onExitSearchMouseLeave = () => {
    clearTimeout(timer2ID);
    setExitSearchHovered(false);
  };

  return (
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
        {searchHovered && (
          <div
            className="tooltip-search"
            style={{
              opacity: !showInput ? "1" : "0",
              visibility: !showInput ? "visible" : "hidden",
            }}
          >
            <div className="content">Search</div>
            <div className="triangle" />
          </div>
        )}

        <div className="header__search--icon">
          <SearchIcon color="#2564cf" />
        </div>

        {showInput && (
          <div className="header__search--input">
            <input ref={inputRef} type="text" placeholder="Search" />
            <span
              onClick={() => setShowInput(false)}
              onMouseEnter={onExitSearchMouseEnter}
              onMouseLeave={onExitSearchMouseLeave}
            >
              <XIcon />

              {exitSearchHovered && (
                <div
                  className="tooltip-exit-search"
                  // style={{
                  //   visibility: "visible",
                  //   opacity: 1,
                  // }}
                >
                  <div className="triangle" />
                  <div className="content">Exit search</div>
                </div>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderSearch;
