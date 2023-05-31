import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  calendarModal: ModalItemType;
  customRepeatModal: ModalItemType;
  dueDateModal: ModalItemType; // done
  // listActionsModal: ModalItemType;
  // groupActionsModal: ModalItemType;
  // groupsModal: ModalItemType;
  listOptionsModal: ModalItemType; // done
  remindMeModal: ModalItemType;
  repeatModal: ModalItemType;
  timeOptionsModal: ModalItemType;
  sortModal: ModalItemType;
}

const initialState: ModalsStateType = {
  calendarModal: initialModalState,
  customRepeatModal: initialModalState,
  dueDateModal: initialModalState,
  // groupActionsModal: initialModalState,
  // groupsModal: initialModalState,
  // listActionsModal: initialModalState,
  listOptionsModal: initialModalState,
  remindMeModal: initialModalState,
  repeatModal: initialModalState,
  timeOptionsModal: initialModalState,
  ////////////////////////////////////////////
  sortModal: initialModalState,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    calendarModalToggler: (
      state,
      action: PayloadAction<{
        open: boolean;
        coordinates?: CoordinatesTypes;
        timeForCalendar?: boolean;
      }>
    ) => {
      state.calendarModal.open = action.payload.open;
      state.calendarModal.coordinates = action.payload.coordinates ?? {
        x: 0,
        y: 0,
      };
      state.calendarModal.timeForCalendar = action.payload.timeForCalendar;
    },

    customRepeatModalToggler: (
      state,
      action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    ) => {
      state.customRepeatModal.open = action.payload.open;
      state.customRepeatModal.coordinates = action.payload.coordinates ?? {
        x: 0,
        y: 0,
      };
    },

    dueDateModalToggler: (
      state,
      action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    ) => {
      state.dueDateModal.open = action.payload.open;
      state.dueDateModal.coordinates = action.payload.coordinates ?? {
        x: 0,
        y: 0,
      };
    },

    // groupActionsModalToggler: (
    //   state,
    //   action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    // ) => {
    //   state.groupActionsModal.open = action.payload.open;
    //   state.groupActionsModal.coordinates = action.payload.coordinates ?? {
    //     x: 0,
    //     y: 0,
    //   };
    // },

    // groupsModalToggler: (
    //   state,
    //   action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    // ) => {
    //   state.groupsModal.open = action.payload.open;
    //   state.groupsModal.coordinates = action.payload.coordinates ?? {
    //     x: 0,
    //     y: 0,
    //   };
    // },

    // listActionsModalToggler: (
    //   state,
    //   action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    // ) => {
    //   state.listActionsModal.open = action.payload.open;
    //   state.listActionsModal.coordinates = action.payload.coordinates ?? {
    //     x: 0,
    //     y: 0,
    //   };
    // },

    listOptionsModalToggler: (
      state,
      action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    ) => {
      state.listOptionsModal.open = action.payload.open;
      state.listOptionsModal.coordinates = action.payload.coordinates ?? {
        x: 0,
        y: 0,
      };
    },

    remindMeModalToggler: (
      state,
      action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    ) => {
      state.remindMeModal.open = action.payload.open;
      state.remindMeModal.coordinates = action.payload.coordinates ?? {
        x: 0,
        y: 0,
      };
    },

    repeatModalToggler: (
      state,
      action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    ) => {
      state.repeatModal.open = action.payload.open;
      state.repeatModal.coordinates = action.payload.coordinates ?? {
        x: 0,
        y: 0,
      };
    },

    timeOptionsModalToggler: (
      state,
      action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    ) => {
      state.timeOptionsModal.open = action.payload.open;
      state.timeOptionsModal.coordinates = action.payload.coordinates ?? {
        x: 0,
        y: 0,
      };
    },
  },
});

export const {
  listOptionsModalToggler,
  calendarModalToggler,
  dueDateModalToggler,
  remindMeModalToggler,
  repeatModalToggler,
  timeOptionsModalToggler,
  customRepeatModalToggler,
} = modalsSlice.actions;

export default modalsSlice.reducer;

// export const modalsReducer: Reducer<ModalsStateType, AnyAction> = (
//   state: ModalsStateType = initialState,
//   action: AnyAction
// ) => {
//   switch (action.type) {
//     case LIST_OPTIONS_MODAL_OPEN:
//       return { ...state, listOptionsModal: action.payload };
//     case LIST_OPTIONS_MODAL_CLOSE:
//       return { ...state, listOptionsModal: action.payload };

//     case SORT_MODAL_OPEN:
//       return { ...state, sortModal: action.payload };
//     case SORT_MODAL_CLOSE:
//       return { ...state, sortModal: action.payload };

//     case DUE_DATE_MODAL_OPEN:
//       return { ...state, dueDateModal: action.payload };
//     case DUE_DATE_MODAL_CLOSE:
//       return { ...state, dueDateModal: action.payload };

//     case PICK_DATE_MODAL_OPEN:
//       return { ...state, pickDateModal: action.payload };
//     case PICK_DATE_MODAL_CLOSE:
//       return { ...state, pickDateModal: action.payload };

//     case PICK_DATE_AND_TIME_MODAL_OPEN:
//       return { ...state, pickDateAndTimeModal: action.payload };
//     case PICK_DATE_AND_TIME_MODAL_CLOSE:
//       return { ...state, pickDateAndTimeModal: action.payload };

//     case REMINDER_MODAL_OPEN:
//       return { ...state, remindMeModal: action.payload };
//     case REMINDER_MODAL_CLOSE:
//       return { ...state, remindMeModal: action.payload };

//     case REPEAT_MODAL_OPEN:
//       return { ...state, repeatModal: action.payload };
//     case REPEAT_MODAL_CLOSE:
//       return { ...state, repeatModal: action.payload };

//     case CUSTOM_REPEAT_MODAL_OPEN:
//       return { ...state, customRepeatModal: action.payload };
//     case CUSTOM_REPEAT_MODAL_CLOSE:
//       return { ...state, customRepeatModal: action.payload };

//     case TIME_OPTIONS_MODAL_OPEN:
//       return { ...state, timeOptionsModal: action.payload };
//     case TIME_OPTIONS_MODAL_CLOSE:
//       return { ...state, timeOptionsModal: action.payload };

//     case CALENDAR_MODAL_OPEN:
//       return { ...state, calendarModal: action.payload };
//     case CALENDAR_MODAL_CLOSE:
//       return { ...state, calendarModal: action.payload };

//     case LIST_ACTIONS_MODAL_OPEN:
//       return { ...state, listActionsModal: action.payload };
//     case LIST_ACTIONS_MODAL_CLOSE:
//       return { ...state, listActionsModal: action.payload };

//     case GROUP_ACTIONS_MODAL_OPEN:
//       return { ...state, groupActionsModal: action.payload };
//     case GROUP_ACTIONS_MODAL_CLOSE:
//       return { ...state, groupActionsModal: action.payload };

//     case GROUPS_MODAL_OPEN:
//       return { ...state, groupsModal: action.payload };
//     case GROUPS_MODAL_CLOSE:
//       return { ...state, groupsModal: action.payload };

//     default:
//       return state;
//   }
// };
