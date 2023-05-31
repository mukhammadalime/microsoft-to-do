import { Reducer } from "redux";
import {
  CALENDAR_MODAL_CLOSE,
  CALENDAR_MODAL_OPEN,
  CUSTOM_REPEAT_MODAL_CLOSE,
  CUSTOM_REPEAT_MODAL_OPEN,
  DUE_DATE_MODAL_CLOSE,
  DUE_DATE_MODAL_OPEN,
  GROUPS_MODAL_CLOSE,
  GROUPS_MODAL_OPEN,
  GROUP_ACTIONS_MODAL_CLOSE,
  GROUP_ACTIONS_MODAL_OPEN,
  LIST_ACTIONS_MODAL_CLOSE,
  LIST_ACTIONS_MODAL_OPEN,
  LIST_OPTIONS_MODAL_CLOSE,
  LIST_OPTIONS_MODAL_OPEN,
  PICK_DATE_AND_TIME_MODAL_CLOSE,
  PICK_DATE_AND_TIME_MODAL_OPEN,
  PICK_DATE_MODAL_CLOSE,
  PICK_DATE_MODAL_OPEN,
  REMINDER_MODAL_CLOSE,
  REMINDER_MODAL_OPEN,
  REPEAT_MODAL_CLOSE,
  REPEAT_MODAL_OPEN,
  SORT_MODAL_CLOSE,
  SORT_MODAL_OPEN,
  TIME_OPTIONS_MODAL_CLOSE,
  TIME_OPTIONS_MODAL_OPEN,
} from "../constants/modalsConstants";
import { ModalsActions } from "../actions";
import { CoordinatesTypes } from "../../types/designTypes";

export interface ModalItemType {
  open: boolean;
  coordinates: CoordinatesTypes;
  timeForCalendar?: boolean;
  actionsLimited?: boolean;
}

const initialModalState: ModalItemType = {
  open: false,
  coordinates: { x: 0, y: 0 },
};

export interface ModalsStateType {
  dueDateModal: ModalItemType;
  listOptionsModal: ModalItemType;
  sortModal: ModalItemType;
  pickDateModal: ModalItemType;
  pickDateAndTimeModal: ModalItemType;
  reminderModal: ModalItemType;
  repeatModal: ModalItemType;
  customRepeatModal: ModalItemType;
  timeOptionsModal: ModalItemType;
  calendarModal: ModalItemType;
  listActionsModal: ModalItemType;
  groupActionsModal: ModalItemType;
  groupsModal: ModalItemType;
}

export const initialModalsState: ModalsStateType = {
  listOptionsModal: initialModalState,
  sortModal: initialModalState,
  dueDateModal: initialModalState,
  pickDateModal: initialModalState,
  pickDateAndTimeModal: initialModalState,
  reminderModal: initialModalState,
  repeatModal: initialModalState,
  customRepeatModal: initialModalState,
  timeOptionsModal: initialModalState,
  calendarModal: initialModalState,
  listActionsModal: initialModalState,
  groupActionsModal: initialModalState,
  groupsModal: initialModalState,
};

export const modalsReducer: Reducer<ModalsStateType, ModalsActions> = (
  state: ModalsStateType = initialModalsState,
  action: ModalsActions
) => {
  switch (action.type) {
    case LIST_OPTIONS_MODAL_OPEN:
      return { ...state, listOptionsModal: action.payload };
    case LIST_OPTIONS_MODAL_CLOSE:
      return { ...state, listOptionsModal: action.payload };

    case SORT_MODAL_OPEN:
      return { ...state, sortModal: action.payload };
    case SORT_MODAL_CLOSE:
      return { ...state, sortModal: action.payload };

    case DUE_DATE_MODAL_OPEN:
      return { ...state, dueDateModal: action.payload };
    case DUE_DATE_MODAL_CLOSE:
      return { ...state, dueDateModal: action.payload };

    case PICK_DATE_MODAL_OPEN:
      return { ...state, pickDateModal: action.payload };
    case PICK_DATE_MODAL_CLOSE:
      return { ...state, pickDateModal: action.payload };

    case PICK_DATE_AND_TIME_MODAL_OPEN:
      return { ...state, pickDateAndTimeModal: action.payload };
    case PICK_DATE_AND_TIME_MODAL_CLOSE:
      return { ...state, pickDateAndTimeModal: action.payload };

    case REMINDER_MODAL_OPEN:
      return { ...state, reminderModal: action.payload };
    case REMINDER_MODAL_CLOSE:
      return { ...state, reminderModal: action.payload };

    case REPEAT_MODAL_OPEN:
      return { ...state, repeatModal: action.payload };
    case REPEAT_MODAL_CLOSE:
      return { ...state, repeatModal: action.payload };

    case CUSTOM_REPEAT_MODAL_OPEN:
      return { ...state, customRepeatModal: action.payload };
    case CUSTOM_REPEAT_MODAL_CLOSE:
      return { ...state, customRepeatModal: action.payload };

    case TIME_OPTIONS_MODAL_OPEN:
      return { ...state, timeOptionsModal: action.payload };
    case TIME_OPTIONS_MODAL_CLOSE:
      return { ...state, timeOptionsModal: action.payload };

    case CALENDAR_MODAL_OPEN:
      return { ...state, calendarModal: action.payload };
    case CALENDAR_MODAL_CLOSE:
      return { ...state, calendarModal: action.payload };

    case LIST_ACTIONS_MODAL_OPEN:
      return { ...state, listActionsModal: action.payload };
    case LIST_ACTIONS_MODAL_CLOSE:
      return { ...state, listActionsModal: action.payload };

    case GROUP_ACTIONS_MODAL_OPEN:
      return { ...state, groupActionsModal: action.payload };
    case GROUP_ACTIONS_MODAL_CLOSE:
      return { ...state, groupActionsModal: action.payload };

    case GROUPS_MODAL_OPEN:
      return { ...state, groupsModal: action.payload };
    case GROUPS_MODAL_CLOSE:
      return { ...state, groupsModal: action.payload };

    default:
      return state;
  }
};
