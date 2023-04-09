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
