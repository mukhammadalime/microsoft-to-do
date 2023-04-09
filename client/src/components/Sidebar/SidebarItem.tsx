import { SideBarItemType } from "../../types/designTypes";
import ListIcon from "../../Icons/ListIcon";

const SidebarItem = ({
  name,
  img,
  dublicateNumber,
  activeBar,
  setActiveBar,
}: SideBarItemType & {
  activeBar: string;
  setActiveBar: (item: string) => void;
}) => {
  const checkActiveBar = dublicateNumber
    ? activeBar === `${name} (${dublicateNumber})`
    : activeBar === name;

  return (
    <div className={`sidebar__itemWrapper${checkActiveBar ? " active" : ""}`}>
      <div
        className={`sidebar__item`}
        onClick={() =>
          setActiveBar(
            `${name}${dublicateNumber ? ` (${dublicateNumber})` : ""}`
          )
        }
      >
        {img ? img : <ListIcon color="#323130" />}
        <div>
          <span>{name}</span>
          {dublicateNumber && <span>{` (${dublicateNumber})`}</span>}
        </div>
        {/* <span>2</span> */}
      </div>
    </div>
  );
};

export default SidebarItem;
