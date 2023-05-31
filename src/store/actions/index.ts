import {
  SidebarGroupItemType,
  SidebarListItemType,
} from "../../types/designTypes";
import { ModalItemType } from "../reducers/modalsReducer";
import { TooltipItemType } from "../reducers/tooltipsReducer";

export interface ModalsActions {
  type: string;
  payload: ModalItemType;
}

export interface TooltipsActions {
  type: string;
  payload: TooltipItemType;
}

export interface ListsActions {
  type: string;
  payload: {
    lists: SidebarListItemType[];
    listItem: SidebarListItemType;
    error: string;
  };
}

export interface GroupsActions {
  type: string;
  payload: {
    groups: SidebarGroupItemType[];
    groupItem: SidebarGroupItemType;
    error: string;
  };
}
