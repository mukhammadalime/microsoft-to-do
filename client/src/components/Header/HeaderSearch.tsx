import { useEffect, useRef, useState } from "react";
import useWindowWidth from "../../hooks/useWindowWidth";

const HeaderSearch = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showInput, setShowInput] = useState<boolean>(() => false);
  const [searchHovered, setSearchHovered] = useState(() => false);
  const windowWidth = useWindowWidth();

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: any) => {
      if (!searchRef.current!.contains(e.target) && !inputRef.current?.value) {
        showInput ? setSearchHovered(true) : setSearchHovered(false);
        setShowInput(false);
      }
    };

    document.addEventListener("mousedown", outsideClickHandler, true);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler, true);
    };
  }, [showInput]);

  // SHOW SEARCH INPUT
  const showSearchInput = () => {
    if (!showInput) {
      setShowInput(true);
      setTimeout(() => inputRef.current!.focus(), 0);
    }
  };

  // SHOW SEARCH TOOLTIP
  const onSearchMouseEnter = () =>
    setTimeout(() => setSearchHovered(true), 200);
  const onSearchMouseLeave = () => setSearchHovered(false);

  return (
    <div>
      <div
        className="header__search"
        onClick={showSearchInput}
        ref={searchRef}
        onMouseEnter={onSearchMouseEnter}
        onMouseLeave={onSearchMouseLeave}
        style={{
          width: windowWidth <= 900 && showInput ? "100%" : "",
          maxWidth: windowWidth <= 900 && showInput ? "100%" : "",
        }}
      >
        <div
          className="tooltip-search"
          style={{
            opacity: searchHovered && !showInput ? "1" : "0",
            transition: "all .2s",
            visibility: searchHovered && !showInput ? "visible" : "hidden",
          }}
        >
          <div className="content">Search</div>
          <div className="triangle" />
        </div>

        <div className="header__search--icon">
          <img src="./assets/icons/search.svg" alt="" />
        </div>
        {showInput && (
          <div className="header__search--input">
            <input ref={inputRef} type="text" placeholder="Search" />
            <span onClick={() => setShowInput(false)}>
              <img src="./assets/icons/x-lg.svg" alt="" />
              <div className="tooltip-exit-search">
                <div className="triangle" />
                <div className="content">Exit search</div>
              </div>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderSearch;
