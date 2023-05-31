import { SidebarListItemType } from "../../types/designTypes";

export interface ListStateType {
  lists: SidebarListItemType[];
  success: boolean;
  loading: boolean;
  fetchError: null | string;
}

export const initialListsState: ListStateType = {
  lists: [] as SidebarListItemType[],
  success: false,
  loading: false,
  fetchError: null,
};
