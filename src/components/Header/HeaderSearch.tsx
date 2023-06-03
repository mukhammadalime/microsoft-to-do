import XIcon from "../../Icons/XIcon";
import SearchIcon from "../../Icons/SearchIcon";
import { useEffect, useRef, useState } from "react";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useAppDispatch } from "../../hooks/useReduxHooks";
import {
  exitSearchTooltipToggler,
  searchTooltipToggler,
} from "../../store/reducers/tooltipsReducer";

const HeaderSearch = () => {
  /// REDUX
  const dispatch = useAppDispatch();

  const windowWidth = useWindowWidth();
  const searchRef = useRef<HTMLDivElement>(null);
  const searchIconRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [searchTimerID, setSearchTimerID] = useState<NodeJS.Timeout>();
  const [exitTimerID, setExitTimerID] = useState<NodeJS.Timeout>();

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      if (
        !searchRef.current!.contains(e.target as HTMLDivElement) &&
        !inputRef.current?.value
      ) {
        showInput
          ? dispatch(searchTooltipToggler({ open: true }))
          : dispatch(searchTooltipToggler({ open: false }));

        setShowInput(false);
      }
    };

    document.addEventListener("mousedown", outsideClickHandler);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, [showInput, dispatch]);

  // SHOW SEARCH INPUT
  const showSearchInput = (): void => {
    // We clear search timeout because we do not want search tooltip to show up after clicking search input in less than 400 ms
    clearTimeout(searchTimerID);
    dispatch(searchTooltipToggler({ open: false }));
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

    if (!showInput) {
      const id = setTimeout(() => {
        dispatch(
          searchTooltipToggler({
            open: true,
            coordinates: {
              left: searchTooltipPosition.left - 66,
              top: searchTooltipPosition.top,
            },
          })
        );
      }, 300);
      setSearchTimerID(id);
    }
  };
  const onSearchMouseLeave = () => {
    clearTimeout(searchTimerID);
    dispatch(searchTooltipToggler({ open: false }));
  };

  // ON EXIT SEARCH MOUSE ENTER
  const onExitSearchMouseEnter = () => {
    const exitTooltipHost = document.querySelector(
      ".exit-tooltip-host"
    ) as HTMLDivElement;
    const exitSearchTooltipPosition = exitTooltipHost.getBoundingClientRect();

    const id = setTimeout(() => {
      dispatch(
        exitSearchTooltipToggler({
          open: true,
          coordinates: {
            left: exitSearchTooltipPosition.left - 22,
            top: 51,
          },
        })
      );
    }, 300);
    setExitTimerID(id);
  };

  // ON EXIT SEARCH MOUSE LEAVE
  const onExitSearchMouseLeave = () => {
    clearTimeout(exitTimerID);
    dispatch(exitSearchTooltipToggler({ open: false }));
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
    </>
  );
};

export default HeaderSearch;
