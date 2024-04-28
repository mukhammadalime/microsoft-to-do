import { useState } from "react";
import TaskItem from "./TaskItem";

const TaskItemsContainer = () => {
  const [selectedTaskItem, setSelectedTaskItem] = useState<string>("");

  return (
    <div className="tasks">
      <div className="tasks__scrollContainer">
        <div className="tasks__list">
          <TaskItem
            setSelected={(id: string) => setSelectedTaskItem(id)}
            id="1"
            selected={selectedTaskItem === "1" && true}
          />

          <TaskItem
            setSelected={(id: string) => setSelectedTaskItem(id)}
            id="2"
            selected={selectedTaskItem === "2" && true}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskItemsContainer;
