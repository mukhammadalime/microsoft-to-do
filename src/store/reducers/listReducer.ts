import { Reducer } from "redux";
import { SidebarListItemType } from "../../types/designTypes";
import { ListsActions } from "../actions";
import {
  ADD_LIST_FAIL,
  ADD_LIST_REQUEST,
  ADD_LIST_SUCCESS,
  LISTS_FAIL,
  LISTS_REQUEST,
  LISTS_SUCCESS,
  RENAME_LIST_FAIL,
  RENAME_LIST_REQUEST,
  RENAME_LIST_SUCCESS,
} from "../constants/listConstants";

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

export const listReducer: Reducer<ListStateType, ListsActions> = (
  state: ListStateType = initialListsState,
  action: ListsActions
) => {
  switch (action.type) {
    // FETCH LISTS
    case LISTS_REQUEST:
      return { ...state, loading: true };
    case LISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        lists: action.payload.lists,
        success: true,
      };
    case LISTS_FAIL:
      return {
        ...state,
        loading: false,
        fetchError: action.payload.error,
        success: false,
      };
    // ADD NEW LIST
    case ADD_LIST_REQUEST:
      return { ...state, loading: true };
    case ADD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        lists: state.lists.concat([action.payload.listItem]),
        success: true,
      };
    case ADD_LIST_FAIL:
      return {
        ...state,
        loading: false,
        fetchError: action.payload.error,
        success: false,
      };

    // RENAME LIST
    case RENAME_LIST_REQUEST:
      return { ...state, loading: true };
    case RENAME_LIST_SUCCESS:
      const currentListsArr = state.lists;
      const updatedListID = action.payload.listItem.id;
      const updatedListIndex = state.lists.findIndex(
        (list) => list.id === updatedListID
      );
      currentListsArr[updatedListIndex] = action.payload.listItem;

      return {
        ...state,
        loading: false,
        lists: currentListsArr,
        success: true,
      };
    case RENAME_LIST_FAIL:
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
