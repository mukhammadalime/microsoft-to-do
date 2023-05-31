import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoordinatesTypes, SidebarListItemType } from "../../types/designTypes";

export interface ModalItemType {
  open: boolean;
  coordinates: CoordinatesTypes;
  timeForCalendar?: boolean;
  actionsDisabled?: boolean | "limited";
  item?: SidebarListItemType;
}

const initialModalState: ModalItemType = {
  open: false,
  coordinates: { left: 0, top: 0 },
};

export interface ModalsStateType {
  calendarModal: ModalItemType;
  customRepeatModal: ModalItemType;
  dueDateModal: ModalItemType;
  listActionsModal: ModalItemType;
  // groupActionsModal: ModalItemType;
  // groupsModal: ModalItemType;
  listOptionsModal: ModalItemType;
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
  listActionsModal: initialModalState,
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
        left: 0,
        top: 0,
      };
      state.calendarModal.timeForCalendar = action.payload.timeForCalendar;
    },

    customRepeatModalToggler: (
      state,
      action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    ) => {
      state.customRepeatModal.open = action.payload.open;
      state.customRepeatModal.coordinates = action.payload.coordinates ?? {
        left: 0,
        top: 0,
      };
    },

    dueDateModalToggler: (
      state,
      action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    ) => {
      state.dueDateModal.open = action.payload.open;
      state.dueDateModal.coordinates = action.payload.coordinates ?? {
        left: 0,
        top: 0,
      };
    },

    // groupActionsModalToggler: (
    //   state,
    //   action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    // ) => {
    //   state.groupActionsModal.open = action.payload.open;
    //   state.groupActionsModal.coordinates = action.payload.coordinates ?? {
    //     left: 0,
    //     top: 0,
    //   };
    // },

    // groupsModalToggler: (
    //   state,
    //   action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    // ) => {
    //   state.groupsModal.open = action.payload.open;
    //   state.groupsModal.coordinates = action.payload.coordinates ?? {
    //     left: 0,
    //     top: 0,
    //   };
    // },

    listActionsModalToggler: (
      state,
      action: PayloadAction<{
        open: boolean;
        coordinates?: CoordinatesTypes;
        item?: SidebarListItemType;
        actionsDisabled?: boolean | "limited";
      }>
    ) => {
      state.listActionsModal.open = action.payload.open;
      state.listActionsModal.coordinates = action.payload.coordinates ?? {
        left: 0,
        top: 0,
      };
      state.listActionsModal.item = action.payload.item;
      state.listActionsModal.actionsDisabled = action.payload.actionsDisabled;
    },

    listOptionsModalToggler: (
      state,
      action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    ) => {
      state.listOptionsModal.open = action.payload.open;
      state.listOptionsModal.coordinates = action.payload.coordinates ?? {
        left: 0,
        top: 0,
      };
    },

    remindMeModalToggler: (
      state,
      action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    ) => {
      state.remindMeModal.open = action.payload.open;
      state.remindMeModal.coordinates = action.payload.coordinates ?? {
        left: 0,
        top: 0,
      };
    },

    repeatModalToggler: (
      state,
      action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    ) => {
      state.repeatModal.open = action.payload.open;
      state.repeatModal.coordinates = action.payload.coordinates ?? {
        left: 0,
        top: 0,
      };
    },

    timeOptionsModalToggler: (
      state,
      action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    ) => {
      state.timeOptionsModal.open = action.payload.open;
      state.timeOptionsModal.coordinates = action.payload.coordinates ?? {
        left: 0,
        top: 0,
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
  listActionsModalToggler,
} = modalsSlice.actions;

export default modalsSlice.reducer;
