import { useState } from "react";
import SidebarItem from "../SidebarItem";
import { SideBarGroupType } from "../../../types/designTypes";

interface GroupBoxTypes extends SideBarGroupType {
  activeBar: string;
  setActiveBar: (str: string) => void;
  updateGroupHandler: (items: SideBarGroupType[]) => void;
}

const GroupBox = ({
  name,
  open,
  id,
  dublicateNumber,
  activeBar,
  setActiveBar,
  updateGroupHandler,
}: GroupBoxTypes) => {
  // TOGGLE GROUP BOX
  const toggleGroupBox = () => {
    const existingGroups = JSON.parse(localStorage.getItem("groups")!);
    const currentGroupIndex = existingGroups.findIndex(
      (item: SideBarGroupType) => item.id === id
    );

    const currentGroup = existingGroups[currentGroupIndex];
    existingGroups[currentGroupIndex] = { ...currentGroup, open: !open };

    localStorage.setItem("groups", JSON.stringify(existingGroups));
    updateGroupHandler(existingGroups);
  };

  return (
    <div className={`groupBox${open ? " groupBox-opened" : ""}`}>
      <div className="groupBox__header" onClick={toggleGroupBox}>
        <div>
          <img src="./assets/icons/groupIcon.svg" alt="" />
          <span>
            {name} <span>{dublicateNumber ? ` (${dublicateNumber})` : ""}</span>
          </span>
        </div>

        <img src="./assets/icons/arrow-left.svg" alt="" />
      </div>

      <div className="groupBox__items">
        {/* <SidebarItem
          name="Hello"
          activeBar={activeBar}
          setActiveBar={(item: string) => setActiveBar(item)}
        />
        <SidebarItem
          name="Hello 2"
          activeBar={activeBar}
          setActiveBar={(item: string) => setActiveBar(item)}
        /> */}

        <div className="groupBox__items">
          <div className="groupBox__empty">
            <span>Drag here to add lists</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupBox;
