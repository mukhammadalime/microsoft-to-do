/// HEADER TYPES

import { ReactElement } from "react";

// An interface for buttons state
export interface HeaderButtonsTypes {
  settings: boolean;
  help: boolean;
  notifications: boolean;
  avatar: boolean;
}
// Action types for buttons
export type HeaderActionsTypes =
  | "SETTINGS"
  | "HELP"
  | "NOTIFICATIONS"
  | "AVATAR";

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
export interface SidebarListItemType {
  name: string;
  dublicateNumber?: number;
  createdAt: number;
  type: string;
  id: string;
  opened: boolean;
}

export interface DefaultSidebarItemType {
  name: string;
  img: ReactElement;
  id: string;
  actionsDisabled: boolean | "limited";
}

/// SIDEBAR GROUP TYPE
export interface SidebarGroupItemType {
  name: string;
  dublicateNumber?: number;
  createdAt: number;
  type: string;
  id: string;
  opened: boolean;
  lists: string[];
}

/// COORDINATES TYPES
export interface CoordinatesTypes {
  x: number;
  y: number;
}
