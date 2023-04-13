import { ReactElement } from "react";
import CalendarIcon from "../Icons/CalendarIcon";
import HomeIcon from "../Icons/HomeIcon";
import PersonIcon from "../Icons/PersonIcon";
import StarIcon from "../Icons/StarIcon";
import SunIcon from "../Icons/SunIcon";
import { _365AppsTypes } from "../types/designTypes";

export const _365Apps: _365AppsTypes[] = [
  {
    name: "Outlook",
    link: "",
    imgLocation: "outlook.svg",
  },
  {
    name: "OneDrive",
    link: "",
    imgLocation: "onedrive.png",
  },
  {
    name: "Teams",
    link: "",
    imgLocation: "teams.svg",
  },
  {
    name: "Word",
    link: "",
    imgLocation: "word.svg",
  },
  {
    name: "Excel",
    link: "",
    imgLocation: "excel.svg",
  },
  {
    name: "PowerPoint",
    link: "",
    imgLocation: "powerpoint.svg",
  },
  {
    name: "OneNote",
    link: "",
    imgLocation: "onenote.svg",
  },
  {
    name: "To Do",
    link: "",
    imgLocation: "todo.svg",
  },
  {
    name: "Family Safety",
    link: "",
    imgLocation: "family-safety.png",
  },
  {
    name: "Calendar",
    link: "",
    imgLocation: "calendar.png",
  },
  {
    name: "Clipchamp",
    link: "",
    imgLocation: "clipchamp.svg",
  },
  {
    name: "Skype",
    link: "",
    imgLocation: "skype.png",
  },
  {
    name: "Lists",
    link: "",
    imgLocation: "lists.png",
  },
  {
    name: "People",
    link: "",
    imgLocation: "people.png",
  },
  {
    name: "Power Automate",
    link: "",
    imgLocation: "power-automate.png",
  },
  {
    name: "Sway",
    link: "",
    imgLocation: "sway.png",
  },
  {
    name: "Forms",
    link: "",
    imgLocation: "forms.png",
  },
];

export const moreFromMicrosoft: _365AppsTypes[] = [
  {
    name: "Bing",
    link: "",
    imgLocation: "bing.svg",
  },
  {
    name: "MSN",
    link: "",
    imgLocation: "msn.svg",
  },
  {
    name: "Privacy",
    link: "",
    imgLocation: "privacy.png",
  },

  {
    name: "Rewards",
    link: "",
    imgLocation: "rewards.png",
  },
];

export const defaultSideBarItems: {
  name: string;
  img: ReactElement;
  actionsDisabled: boolean | "limited";
}[] = [
  {
    name: "My Day",
    img: <SunIcon color="#323130" />,
    actionsDisabled: true,
  },
  {
    name: "Important",
    img: <StarIcon color="#323130" />,
    actionsDisabled: true,
  },
  {
    name: "Planned",
    img: <CalendarIcon color="#323130" />,
    actionsDisabled: true,
  },
  {
    name: "Assigned to me",
    img: <PersonIcon color="#323130" />,
    actionsDisabled: true,
  },
  {
    name: "Tasks",
    img: <HomeIcon color="#323130" />,
    actionsDisabled: "limited",
  },
];
