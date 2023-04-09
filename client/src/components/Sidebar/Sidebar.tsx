import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SideBarGroupType, SideBarItemType } from "../../types/designTypes";
import SidebarItem from "./SidebarItem";
import AddGroupInput from "./GroupRelatedFiles/AddGroupInput";
import AddListOrGroup from "./AddListOrGroup";
import GroupBox from "./GroupRelatedFiles/GroupBox";
import { defaultSideBarItems } from "../../data/micorost-apps";
import SidebarFooter from "./SidebarFooter";

const Sidebar = ({ onClose }: { onClose: () => void }) => {
  const [lists, setLists] = useState<SideBarItemType[]>(() => []);
  const [groups, setGroups] = useState<SideBarGroupType[]>(() => []);
  const newListRef = useRef<HTMLInputElement>(null);
  const newGroupRef = useRef<HTMLInputElement>(null);
  const addGroupButtonRef = useRef<HTMLDivElement>(null);
  const [activeBar, setActiveBar] = useState<string>(() => "My Day");
  const [showAddGroupInput, setShowAddGroupInput] = useState<boolean>(false);

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

    // Retrive data from local storage
    const existingLists = JSON.parse(localStorage.getItem("lists")!) ?? [];

    /// Return if the nothing is entered in the input
    if (!newListRef.current!.value) return;

    // Check if the creating list's name is already in the list
    const sameLists = existingLists.filter(
      (item: SideBarItemType) => item.name === newListRef.current!.value
    );

    /// When the creating list name is unique
    if (sameLists.length === 0) {
      const newList = {
        name: newListRef.current!.value,
        createdAt: Date.now(),
        id: uuidv4(),
        type: "LIST",
      };
      localStorage.setItem(
        "lists",
        JSON.stringify([...existingLists, newList])
      );
      setLists((prevState: SideBarItemType[]) => {
        return [...prevState, newList];
      });
      setActiveBar(newListRef!.current!.value);
    }

    /// When the creating list name is being repeated
    if (sameLists.length > 0) {
      const newList = {
        name: newListRef.current!.value,
        dublicateNumber: sameLists.length,
        createdAt: Date.now(),
        id: uuidv4(),
        type: "LIST",
      };

      setLists((prevState: SideBarItemType[]) => {
        return [...prevState, newList];
      });

      localStorage.setItem(
        "lists",
        JSON.stringify([...existingLists, newList])
      );
      setActiveBar(`${newListRef.current!.value} (${sameLists.length})`);
    }

    setTimeout(() => (newListRef!.current!.value = ""), 0);
    document.getElementById("addList")!.blur();
  };

  //  ADD GROUP HANDLER
  const addGroupHandler = (e?: React.ChangeEvent<HTMLFormElement>) => {
    e && e.preventDefault();
    setShowAddGroupInput(false);

    /// Return if the nothing is entered in the input
    if (!newGroupRef.current!.value) return;

    const existingGroups = JSON.parse(localStorage.getItem("groups")!) ?? [];

    /// When the creating group name is being repeated
    const sameGroups = existingGroups.filter(
      (item: SideBarGroupType) => item.name === newGroupRef.current!.value
    );

    /// When the creating list name is unique
    if (sameGroups.length === 0) {
      const newGroup = {
        name: newGroupRef.current!.value,
        createdAt: Date.now(),
        open: true,
        id: uuidv4(),
        type: "GROUP",
      };

      setGroups((prevState: SideBarGroupType[]) => {
        return [...prevState, newGroup];
      });
      localStorage.setItem(
        "groups",
        JSON.stringify([...existingGroups, newGroup])
      );
    }

    if (sameGroups.length > 0) {
      const newGroup = {
        name: newGroupRef.current!.value,
        dublicateNumber: sameGroups.length,
        createdAt: Date.now(),
        open: true,
        id: uuidv4(),
        type: "GROUP",
      };

      setGroups((prevState: SideBarGroupType[]) => {
        return [...prevState, newGroup];
      });
      localStorage.setItem(
        "groups",
        JSON.stringify([...existingGroups, newGroup])
      );
    }
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
    const outsideClickHandler = (e: any) => {
      const addGroupInputBox = document.getElementById("addGroupBox");

      if (
        !addGroupInputBox?.contains(e.target) &&
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
    <div className="sidebar">
      <div className="sidebar__header">
        <img src="./assets/icons/sidebarIcon.svg" alt="" onClick={onClose} />
      </div>

      <div className="sidebar__content">
        <div className="sidebar__items">
          {defaultSideBarItems.map((item) => (
            <SidebarItem
              {...item}
              key={item.name}
              activeBar={activeBar}
              setActiveBar={(item: string) => setActiveBar(item)}
            />
          ))}

          <div className="sidebar__line"></div>

          <div className="custome-lists">
            {lists.length > 0 &&
              lists.map((list, i) => (
                <SidebarItem
                  {...list}
                  key={i}
                  activeBar={activeBar}
                  setActiveBar={(item: string) => setActiveBar(item)}
                />
              ))}

            {groups.length > 0 &&
              groups.map((item, i) => (
                <GroupBox
                  {...item}
                  activeBar={activeBar}
                  key={i}
                  setActiveBar={(str: string) => setActiveBar(str)}
                  updateGroupHandler={(items: SideBarGroupType[]) =>
                    setGroups(items)
                  }
                />
              ))}

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
  );
};

export default Sidebar;
