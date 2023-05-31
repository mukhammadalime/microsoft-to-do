import { SidebarGroupItemType } from "../../types/designTypes";

export interface GroupStateType {
  groups: SidebarGroupItemType[];
  success: boolean;
  loading: boolean;
  fetchError: null | string;
}

export const initialGroupsState: GroupStateType = {
  groups: [] as SidebarGroupItemType[],
  success: false,
  loading: false,
  fetchError: null,
};
