import { useState } from "react";
import AddTasksBottom from "./AddTasksBottom";
import CircleIcon from "../../Icons/CircleIcon";
import PlusIcon from "../../Icons/PlusIcon";

const AddTasks = () => {
  const [inputFocused, setInputFocused] = useState<boolean>(() => false);
  const [taskText, setTaskText] = useState<string>("");

  return (
    <>
      <div className="add-tasks">
        <div className="add-tasks__top">
          <button>{inputFocused ? <CircleIcon /> : <PlusIcon />}</button>
          <input
            type="text"
            placeholder="Add a task"
            onFocus={() => setInputFocused(true)}
            onChange={(e) => setTaskText(e.target.value)}
          />
        </div>

        <AddTasksBottom inputFocused={inputFocused} taskText={taskText} />
      </div>
    </>
  );
};

export default AddTasks;
