import CircleIcon from "../../../Icons/CircleIcon";
import CircleIconWithTick from "../../../Icons/CircleIconWithTick";
import FilledCircleIconWithTick from "../../../Icons/FilledCircleIconWithTick";
import StarIcon from "../../../Icons/StarIcon";
import CalendarIcon from "../../../Icons/CalendarIcon";
import RepeatIcon from "../../../Icons/RepeatIcon";
import BellIcon from "../../../Icons/BellIcon";
import NoteIcon from "../../../Icons/NoteIcon";
import FileIcon from "../../../Icons/FileIcon";

const TaskItem = ({
  selected,
  setSelected,
  id,
}: {
  selected?: boolean;
  setSelected: (id: string) => void;
  id: string;
}) => {
  return (
    <div
      className={`taskItem${selected && " selected active"}`}
      onClick={() => setSelected(id)}
    >
      <div className="taskItem__body">
        <div className="taskItem__checkBox">
          <CircleIcon />
          <CircleIconWithTick />
          {/* <FilledCircleIconWithTick/> */}
        </div>

        <button className="taskItem__main">
          <div className="taskItem__title">
            <span>Alyov</span>
          </div>

          <div className="taskItem__info">
            <div className="taskItem__infoGroup">
              <div className="taskItem__info--title">
                <span>Tasks</span>
              </div>
            </div>
            <div className="taskItem__infoGroup">
              <div className="taskItem__info--steps">
                <div className="taskItem__info--label">
                  <span>0 of 3</span>
                </div>
              </div>
            </div>
            <div className="taskItem__infoGroup">
              <div className="taskItem__info--date overdue">
                <CalendarIcon />
                <div className="taskItem__info--label">
                  <span>Overdue, mon, June 5</span>
                </div>
                <RepeatIcon className="taskItem__info--repeatIcon" />
              </div>
            </div>

            <div className="taskItem__infoGroup">
              <div className="taskItem__info--reminder">
                <BellIcon />
                <div className="taskItem__info--label">
                  <span>Sun, June 4</span>
                </div>
              </div>
            </div>

            <div className="taskItem__infoGroup">
              <div className="taskItem__info--note">
                <NoteIcon />
              </div>
            </div>

            <div className="taskItem__infoGroup">
              <div className="taskItem__info--attachments">
                <FileIcon />
                <div className="taskItem__info--label">Files attached</div>
              </div>
            </div>

            {Categories.map((item) => (
              <div className="taskItem__infoCategory" key={item.title}>
                <div
                  className="category-icon"
                  style={{
                    backgroundColor: item.backgroundColor,
                    borderColor: item.textAndBorderColor,
                  }}
                ></div>
                <span style={{ color: item.textAndBorderColor }}>
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </button>

        <div className="taskItem__importance-button">
          <StarIcon />
        </div>
      </div>
    </div>
  );
};

const Categories = [
  {
    title: "Green Category",
    backgroundColor: "rgb(233, 249, 232)",
    textAndBorderColor: "rgb(37, 126, 32)",
  },
  {
    title: "Blue Category",
    backgroundColor: "rgb(224, 247, 253)",
    textAndBorderColor: "rgb(0, 120, 153)",
  },
  {
    title: "Red Category",
    backgroundColor: "rgb(252, 233, 234)",
    textAndBorderColor: "rgb(208, 27, 42)",
  },
  {
    title: "Yellow Category",
    backgroundColor: "rgb(255, 253, 224)",
    textAndBorderColor: "rgb(122, 116, 0)",
  },
  {
    title: "Purple Category",
    backgroundColor: "rgb(240, 236, 246)",
    textAndBorderColor: "rgb(125, 87, 178)",
  },
  {
    title: "Orange Category",
    backgroundColor: "rgb(255, 241, 224)",
    textAndBorderColor: "rgb(163, 90, 0)",
  },
];

export default TaskItem;
