import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import {
  listReducer,
  ListStateType,
  initialListsState,
} from "./reducers/listReducer";
import {
  groupReducer,
  GroupStateType,
  initialGroupsState,
} from "./reducers/groupReducer";
import {
  initialModalsState,
  modalsReducer,
  ModalsStateType,
} from "./reducers/modalsReducer";
import {
  TooltipsStateType,
  initialTooltipsState,
  tooltipReducer,
} from "./reducers/tooltipsReducer";

interface initialStateType {
  lists: ListStateType;
  groups: GroupStateType;
  modals: ModalsStateType;
  tooltips: TooltipsStateType;
}

const initialState: initialStateType = {
  lists: initialListsState,
  groups: initialGroupsState,
  modals: initialModalsState,
  tooltips: initialTooltipsState,
};

const reducers = combineReducers({
  lists: listReducer,
  groups: groupReducer,
  modals: modalsReducer,
  tooltips: tooltipReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(thunk))
);

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof reducers>;
export * as modalActionCreators from "./action-creators/modalsActions";
