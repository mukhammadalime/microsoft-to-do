import { Reducer } from "redux";
import { SidebarGroupItemType } from "../../types/designTypes";
import { GroupsActions } from "../actions";
import {
  ADD_GROUP_FAIL,
  ADD_GROUP_REQUEST,
  ADD_GROUP_SUCCESS,
  GROUPS_FAIL,
  GROUPS_REQUEST,
  GROUPS_SUCCESS,
  RENAME_GROUP_FAIL,
  RENAME_GROUP_REQUEST,
  RENAME_GROUP_SUCCESS,
} from "../constants/groupConstants";

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

export const groupReducer: Reducer<GroupStateType, GroupsActions> = (
  state: GroupStateType = initialGroupsState,
  action: GroupsActions
) => {
  switch (action.type) {
    // FETCH GROUPS
    case GROUPS_REQUEST:
      return { ...state, loading: true };
    case GROUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: action.payload.groups,
        success: true,
      };
    case GROUPS_FAIL:
      return {
        ...state,
        loading: false,
        fetchError: action.payload.error,
        success: false,
      };
    // ADD NEW GROUP
    case ADD_GROUP_REQUEST:
      return { ...state, loading: true };
    case ADD_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: state.groups.concat([action.payload.groupItem]),
        success: true,
      };
    case ADD_GROUP_FAIL:
      return {
        ...state,
        loading: false,
        fetchError: action.payload.error,
        success: false,
      };

    // RENAME LIST
    case RENAME_GROUP_REQUEST:
      return { ...state, loading: true };
    case RENAME_GROUP_SUCCESS:
      const currentGroupsArr = state.groups;
      const updatedGroupID = action.payload.groupItem.id;
      const updatedListIndex = state.groups.findIndex(
        (group) => group.id === updatedGroupID
      );
      currentGroupsArr[updatedListIndex] = action.payload.groupItem;
      return {
        ...state,
        loading: false,
        groups: currentGroupsArr,
        success: true,
      };
    case RENAME_GROUP_FAIL:
      return {
        ...state,
        loading: false,
        fetchError: action.payload.error,
        success: false,
      };

    default:
      return state;
  }
};
