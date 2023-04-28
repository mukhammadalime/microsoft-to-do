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
import TasksHeader from "../components/MainContent/TasksHeader";

const MainContent = () => {
  const [inputFocused, setInputFocused] = useState<boolean>(() => false);

  const onInputFocusHandler = () => {
    setInputFocused(true);
  };

  return (
    <div className="centerContent">
      <div className="tasks-container">
        <TasksHeader />

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
