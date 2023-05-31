import AddTasks from "../components/AddTasks/AddTasks";
import TasksHeader from "../components/AddTasksTop/TasksHeader";

const MainContent = () => {
  return (
    <div className="centerContent">
      <div className="tasks-container">
        <TasksHeader />

        <div className="flex-container">
          <AddTasks />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
