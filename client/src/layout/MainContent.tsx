import { useState } from "react";
import CircleIcon from "../Icons/CircleIcon";
import LampIcon from "../Icons/LampIcon";
import SortIcon from "../Icons/SortIcon";
import SunIcon from "../Icons/SunIcon";
import ThreeDotsIcon from "../Icons/ThreeDotsIcon";
import PlusIcon from "../Icons/PlusIcon";
import CalendarIcon from "../Icons/CalendarIcon";
import BellIcon from "../Icons/BellIcon";
import RepeatIcon from "../Icons/RepeatIcon";

const MainContent = () => {
  const [inputFocused, setInputFocused] = useState<boolean>(() => false);

  const onInputFocusHandler = () => {
    setInputFocused(true);
  };

  return (
    <div className="centerContent">
      <div className="tasks-container">
        <div className="tasks-header my-day">
          <div className="tasks-header__content">
            <div className="tasks-header__left">
              <div className="tasks-header__left--top">
                <h2>
                  <SunIcon />
                  <span>My Day</span>
                </h2>
                <button>
                  <ThreeDotsIcon />
                </button>
              </div>
              <div className="tasks-header__left--bottom">
                <span>Friday, April 14</span>
              </div>
            </div>

            <div className="tasks-header__right">
              <button>
                <SortIcon />
                <span>Sort</span>
              </button>
              <button>
                <LampIcon />
                <span>Suggestions</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-container">
          <div className="add-tasks">
            <div className="add-tasks__top">
              <button>{inputFocused ? <CircleIcon /> : <PlusIcon />}</button>
              <input
                type="text"
                placeholder="Add a task"
                onFocus={onInputFocusHandler}
              />
            </div>
            <div
              className={`add-tasks__bottom ${
                inputFocused ? "input-focused" : "input-exited"
              }`}
            >
              <div className="add-tasks__additional">
                <button>
                  <CalendarIcon />
                </button>
                <button>
                  <BellIcon />
                </button>

                <button>
                  <RepeatIcon />
                </button>
              </div>

              <button className="add-tasks__addBtn">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
