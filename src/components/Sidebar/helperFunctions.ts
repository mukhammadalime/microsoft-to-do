import { Dispatch, SetStateAction } from "react";
import {
  SidebarGroupItemType,
  SidebarListItemType,
} from "../../types/designTypes";
import { v4 as uuidv4 } from "uuid";

export const addNewListHelperFn = (
  newListRef: React.RefObject<HTMLInputElement>,
  setLists: Dispatch<SetStateAction<SidebarListItemType[]>>,
  setActiveListItem: (text: string) => void
) => {
  // Retrive data from local storage
  const existingLists = JSON.parse(localStorage.getItem("lists")!) ?? [];

  /// Return if the nothing is entered in the input
  if (!newListRef.current!.value) return;

  // Check if the creating list's name is already in the list
  const sameLists = existingLists.filter(
    (item: SidebarListItemType) => item.itemName === newListRef.current!.value
  );

  const setListsHelperFn = (newItem: SidebarListItemType) => {
    setLists((prevState: SidebarListItemType[]) => {
      return [...prevState, newItem];
    });
    localStorage.setItem("lists", JSON.stringify([...existingLists, newItem]));
  };

  /// When the creating list name is unique
  if (sameLists.length === 0) {
    const newList = {
      itemName: newListRef.current!.value,
      createdAt: Date.now(),
      id: uuidv4(),
      type: "LIST",
      opened: false,
    };
    setListsHelperFn(newList);
    setActiveListItem(newListRef!.current!.value);
  }

  /// When the creating list name is being repeated
  if (sameLists.length > 0) {
    const newList = {
      itemName: newListRef.current!.value,
      dublicateNumber: sameLists.length,
      createdAt: Date.now(),
      id: uuidv4(),
      type: "LIST",
      opened: false,
    };

    setListsHelperFn(newList);
    setActiveListItem(`${newListRef.current!.value} (${sameLists.length})`);
  }

  setTimeout(() => (newListRef!.current!.value = ""), 0);
  document.getElementById("addList")!.blur();
};

//  ADD GROUP HANDLER
export const addGroupHelperFn = (
  setShowAddGroupInput: (type: boolean) => void,
  newGroupRef: React.RefObject<HTMLInputElement>,
  setGroups: Dispatch<SetStateAction<SidebarGroupItemType[]>>
) => {
  setShowAddGroupInput(false);

  // When the input is empty, we manually name it as "Untitled group"
  if (!newGroupRef.current!.value) {
    newGroupRef.current!.value = "Untitled group";
  }

  const existingGroups = JSON.parse(localStorage.getItem("groups")!) ?? [];

  /// When the creating group name is being repeated
  const sameGroups = existingGroups.filter(
    (item: SidebarGroupItemType) => item.itemName === newGroupRef.current!.value
  );

  const setGroupsHelperFn = (newItem: SidebarGroupItemType) => {
    setGroups((prevState: SidebarGroupItemType[]) => {
      return [...prevState, newItem];
    });
    localStorage.setItem(
      "groups",
      JSON.stringify([...existingGroups, newItem])
    );
  };

  /// When the creating list name is unique
  if (sameGroups.length === 0) {
    const newGroup = {
      itemName: newGroupRef.current!.value,
      createdAt: Date.now(),
      id: uuidv4(),
      type: "GROUP",
      opened: true,
      lists: [],
    };

    setGroupsHelperFn(newGroup);
  }

  if (sameGroups.length > 0) {
    const newGroup = {
      itemName: newGroupRef.current!.value,
      dublicateNumber: sameGroups.length,
      createdAt: Date.now(),
      id: uuidv4(),
      type: "GROUP",
      opened: true,
      lists: [],
    };

    setGroupsHelperFn(newGroup);
  }
};
