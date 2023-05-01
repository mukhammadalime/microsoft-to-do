import TasksHeader from "../components/MainContent/TasksHeader";
import AddTasks from "../components/MainContent/AddTasks/AddTasks";

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
