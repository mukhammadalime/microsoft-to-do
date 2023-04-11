/// HEADER TYPES

// An interface for buttons state
export interface ButtonsTypes {
  settings: boolean;
  help: boolean;
  notifications: boolean;
  avatar: boolean;
}
// Action types for buttons
export type ActionType = "SETTINGS" | "HELP" | "NOTIFICATIONS" | "AVATAR";

/// 365 APPS TYPES
export interface _365AppsTypes {
  name: string;
  link: string;
  imgLocation: string;
}

export interface AppsLauncherTypes {
  onClose: () => void;
  opened: boolean;
}

/// SIDEBAR ITEM TYPES
export interface SideBarItemType {
  name: string;
  dublicateNumber?: number;
  createdAt: number;
  type: string;
  id: string;
  opened: boolean;
}

/// SIDEBAR GROUP TYPE
export interface SideBarGroupType {
  name: string;
  dublicateNumber?: number;
  createdAt: number;
  type: string;
  id: string;
  opened: boolean;
  lists: string[];
}
