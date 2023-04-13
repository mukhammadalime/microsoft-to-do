import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  SidebarGroupItemType,
  SidebarListItemType,
} from "../../types/designTypes";
import SidebarListItem from "./ListRelatedFiles/SidebarListItem";
import AddGroupInput from "./GroupRelatedFiles/AddGroupInput";
import AddListOrGroup from "./AddListOrGroup";
import { defaultSideBarItems } from "../../data/micorost-apps";
import SidebarFooter from "./SidebarFooter";
import SidebarGroupItem from "./GroupRelatedFiles/SidebarGroupItem";

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

    // Retrive data from local storage
    const existingLists = JSON.parse(localStorage.getItem("lists")!) ?? [];

    /// Return if the nothing is entered in the input
    if (!newListRef.current!.value) return;

    // Check if the creating list's name is already in the list
    const sameLists = existingLists.filter(
      (item: SidebarListItemType) => item.name === newListRef.current!.value
    );

    /// When the creating list name is unique
    if (sameLists.length === 0) {
      const newList = {
        name: newListRef.current!.value,
        createdAt: Date.now(),
        id: uuidv4(),
        type: "LIST",
        opened: false,
      };
      localStorage.setItem(
        "lists",
        JSON.stringify([...existingLists, newList])
      );
      setLists((prevState: SidebarListItemType[]) => {
        return [...prevState, newList];
      });
      setActiveListItem(newListRef!.current!.value);
    }

    /// When the creating list name is being repeated
    if (sameLists.length > 0) {
      const newList = {
        name: newListRef.current!.value,
        dublicateNumber: sameLists.length,
        createdAt: Date.now(),
        id: uuidv4(),
        type: "LIST",
        opened: false,
      };

      setLists((prevState: SidebarListItemType[]) => {
        return [...prevState, newList];
      });

      localStorage.setItem(
        "lists",
        JSON.stringify([...existingLists, newList])
      );
      setActiveListItem(`${newListRef.current!.value} (${sameLists.length})`);
    }

    setTimeout(() => (newListRef!.current!.value = ""), 0);
    document.getElementById("addList")!.blur();
  };

  //  ADD GROUP HANDLER
  const addGroupHandler = (e?: React.ChangeEvent<HTMLFormElement>) => {
    e && e.preventDefault();
    setShowAddGroupInput(false);

    // When the input is empty, we manually name it as "Untitled group"
    if (!newGroupRef.current!.value) {
      newGroupRef.current!.value = "Untitled group";
    }

    const existingGroups = JSON.parse(localStorage.getItem("groups")!) ?? [];

    /// When the creating group name is being repeated
    const sameGroups = existingGroups.filter(
      (item: SidebarGroupItemType) => item.name === newGroupRef.current!.value
    );

    /// When the creating list name is unique
    if (sameGroups.length === 0) {
      const newGroup = {
        name: newGroupRef.current!.value,
        createdAt: Date.now(),
        id: uuidv4(),
        type: "GROUP",
        opened: true,
        lists: [],
      };

      setGroups((prevState: SidebarGroupItemType[]) => {
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
        id: uuidv4(),
        type: "GROUP",
        opened: true,
        lists: [],
      };

      setGroups((prevState: SidebarGroupItemType[]) => {
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
    <div className="sidebar">
      <div className="sidebar__header">
        <img src="./assets/icons/sidebarIcon.svg" alt="" onClick={onClose} />
      </div>

      <div className="sidebar__content">
        <div className="sidebar__items">
          {defaultSideBarItems.map((item) => {
            return (
              <SidebarListItem
                item={{
                  ...item,
                  createdAt: 0,
                  type: "",
                  id: "",
                  opened: false,
                }}
                actionsDisabled={item.actionsDisabled}
                img={item.img}
                key={item.name}
                activeListItem={activeListItem}
                setActiveListItem={(item: string) => setActiveListItem(item)}
              />
            );
          })}

          <div className="sidebar__line"></div>

          <div>
            {allItems
              .concat(lists)
              .concat(groups)
              .sort(
                (
                  a: SidebarListItemType | SidebarGroupItemType,
                  b: SidebarListItemType | SidebarGroupItemType
                ) => a.createdAt - b.createdAt
              )
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
  );
};

export default Sidebar;
