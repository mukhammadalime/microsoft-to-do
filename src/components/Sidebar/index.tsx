import { useEffect, useRef, useState } from "react";
import {
  SidebarGroupItemType,
  SidebarListItemType,
} from "../../types/designTypes";
import SidebarListItem from "./SidebarListItem";
import AddGroupInput from "./GroupRelatedFiles/AddGroupInput";
import AddListOrGroup from "./AddListOrGroup";
import { defaultSideBarItems } from "../../data/micorost-apps";
import SidebarFooter from "./SidebarFooter";
import SidebarGroupItem from "./GroupRelatedFiles/SidebarGroupItem";
import SidebarIcon from "../../Icons/SidebarIcon";
import { addGroupHelperFn, addNewListHelperFn } from "./helperFunctions";

const Sidebar = ({ onClose }: { onClose: () => void }) => {
  const newListRef = useRef<HTMLInputElement>(null);
  const newGroupRef = useRef<HTMLInputElement>(null);
  const addGroupButtonRef = useRef<HTMLDivElement>(null);
  const [lists, setLists] = useState<SidebarListItemType[]>(() => []);
  const [groups, setGroups] = useState<SidebarGroupItemType[]>(() => []);
  const [activeListItem, setActiveListItem] = useState<string>(() => "My Day");
  const [showAddGroupInput, setShowAddGroupInput] = useState<boolean>(false);

  let allItems: Array<SidebarGroupItemType | SidebarListItemType> = [];

  /// Retrieve lists and groups from local storage
  useEffect(() => {
    const existingLists = JSON.parse(localStorage.getItem("lists")!);
    const existingGroups = JSON.parse(localStorage.getItem("groups")!);
    if (existingLists?.length > 0) setLists(existingLists);
    if (existingGroups?.length > 0) setGroups(existingGroups);
  }, []);

  // ADD NEW LIST
  const addNewListHandler = (e?: React.ChangeEvent<HTMLFormElement>) => {
    e && e.preventDefault();
    addNewListHelperFn(newListRef, setLists, setActiveListItem);
  };

  //  ADD GROUP HANDLER
  const addGroupHandler = (e?: React.ChangeEvent<HTMLFormElement>) => {
    e && e.preventDefault();
    addGroupHelperFn(setShowAddGroupInput, newGroupRef, setGroups);
  };

  // Remove lists that are added to groups
  const removeAddedtoGroupLists = (listItems: SidebarListItemType[]) => {
    const allgroupedListsIDs = groups.map((group) => group.lists).flat(1);

    const updatedLists = [];

    for (let i = 0; i < listItems.length; i++) {
      if (!allgroupedListsIDs.find((item) => item === listItems[i].id)) {
        updatedLists.push(listItems[i]);
      }
    }
    return updatedLists;
  };

  // SHOW ADDGROUPINPUT HANDLER
  const showAddGroupBoxHandler = () => {
    if (newGroupRef?.current?.value) addGroupHandler();
    else setShowAddGroupInput((prevState) => !prevState);

    setTimeout(() => {
      !showAddGroupInput && document.getElementById("addGroupInput")!.focus();
    }, 0);
  };

  // HANDLING OUTSIDE CLICK
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      const addGroupInputBox = document.getElementById("addGroupBox");

      if (
        !addGroupInputBox?.contains(e.target as HTMLDivElement) &&
        !newGroupRef.current?.value
      ) {
        setShowAddGroupInput(false);
      }
    };

    document.addEventListener("mousedown", outsideClickHandler, true);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler, true);
    };
  }, []);

  return (
    <div className="leftContent">
      <div className="sidebar">
        <div className="sidebar__header">
          <div onClick={onClose}>
            <SidebarIcon />
          </div>
        </div>

        <div className="sidebar__content">
          <div
            className="sidebar__items"
            // onScroll={() => {
            //   console.log("Hellow");
            // }}
          >
            {defaultSideBarItems.map((item, i) => {
              return (
                <SidebarListItem
                  item={{
                    ...item,
                    createdAt: 0,
                    type: "",
                    opened: false,
                  }}
                  actionsDisabled={item.actionsDisabled}
                  img={item.img}
                  key={i}
                  activeListItem={activeListItem}
                  setActiveListItem={(item: string) => setActiveListItem(item)}
                />
              );
            })}

            <div className="sidebar__line"></div>

            <div>
              {allItems
                .concat(removeAddedtoGroupLists(lists))
                .concat(groups)
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((item: any, i: number) => {
                  switch (item.type) {
                    case "LIST":
                      return (
                        <SidebarListItem
                          item={item}
                          key={i}
                          activeListItem={activeListItem}
                          setActiveListItem={(item: string) =>
                            setActiveListItem(item)
                          }
                        />
                      );

                    case "GROUP":
                      return (
                        <SidebarGroupItem
                          {...item}
                          activeListItem={activeListItem}
                          key={i}
                          setActiveListItem={(str: string) =>
                            setActiveListItem(str)
                          }
                          updateGroupHandler={(items: SidebarGroupItemType[]) =>
                            setGroups(items)
                          }
                        />
                      );

                    default:
                      return <></>;
                  }
                })}

              {showAddGroupInput && (
                <AddGroupInput ref={newGroupRef} onAddGroup={addGroupHandler} />
              )}
            </div>
          </div>

          <AddListOrGroup
            addNewListHandler={addNewListHandler}
            newListRef={newListRef}
            showAddGroupBoxHandler={showAddGroupBoxHandler}
            addGroupButtonRef={addGroupButtonRef}
          />
        </div>

        <SidebarFooter />
      </div>
    </div>
  );
};

export default Sidebar;
