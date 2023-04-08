// An interface for buttons state
export interface ButtonsTypes {
  settings: boolean;
  help: boolean;
  notifications: boolean;
  avatar: boolean;
}
// Action types for buttons
export type ActionType = "SETTINGS" | "HELP" | "NOTIFICATIONS" | "AVATAR";
