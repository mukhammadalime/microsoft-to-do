import SidebarListItem from "../../SidebarListItem";
import {
  SidebarGroupItemType,
  SidebarListItemType,
} from "../../../../types/designTypes";

const GroupItems = ({
  groupLists,
  activeListItem,
  setActiveListItem,
  groupID,
}: {
  groupLists: SidebarGroupItemType[] | SidebarListItemType[];
  activeListItem: string;
  setActiveListItem: (item: string) => void;
  groupID: string;
}) => {
  return (
    <div className="groupBox__items">
      <div className="groupBox__items--borderLine"></div>
      {groupLists.length > 0 ? (
        <div id={groupID}>
          {groupLists.map((item, i) => (
            <SidebarListItem
              key={i}
              item={item}
              activeListItem={activeListItem}
              setActiveListItem={(item: string) => setActiveListItem(item)}
            />
          ))}
        </div>
      ) : (
        <div className="groupBox__empty">
          <span>Drag here to add lists</span>
        </div>
      )}
    </div>
  );
};

export default GroupItems;
