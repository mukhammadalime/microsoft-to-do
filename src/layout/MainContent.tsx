import AddTasks from "../components/AddTasks/AddTasks";
import TaskItemsContainer from "../components/TaskItems";
import TasksHeader from "../components/TasksHeader";

const MainContent = () => {
  return (
    <div className="centerContent">
      <div className="tasks-container">
        <TasksHeader />

        <div className="flex-container">
          <AddTasks />
          <TaskItemsContainer />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
