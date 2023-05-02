import CalendarIcon from "../Icons/CalendarIcon";
import HomeIcon from "../Icons/HomeIcon";
import PersonIcon from "../Icons/PersonIcon";
import StarIcon from "../Icons/StarIcon";
import SunIcon from "../Icons/SunIcon";
import { DefaultSidebarItemType, _365AppsTypes } from "../types/designTypes";
import ForeverIcon from "../Icons/ForeverIcon";
import CompletedIcon from "../Icons/CompletedIcon";

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

export const defaultSideBarItems: DefaultSidebarItemType[] = [
  {
    name: "My Day",
    img: <SunIcon />,
    actionsDisabled: true,
    id: "myday",
  },
  {
    name: "Important",
    img: <StarIcon />,
    actionsDisabled: true,
    id: "important",
  },
  {
    name: "Planned",
    img: <CalendarIcon />,
    actionsDisabled: true,
    id: "planned",
  },
  {
    name: "All",
    img: <ForeverIcon />,
    actionsDisabled: true,
    id: "all",
  },
  {
    name: "Completed",
    img: <CompletedIcon />,
    actionsDisabled: true,
    id: "completed",
  },
  {
    name: "Assigned to me",
    img: <PersonIcon />,
    actionsDisabled: true,
    id: "assigned_to_me",
  },
  {
    name: "Tasks",
    img: <HomeIcon />,
    actionsDisabled: "limited",
    id: "inbox",
  },
];
