import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  confirmBeforeDeleting: boolean;
  addNewTasksOnTop: boolean;
  moveStarredTaksToTop: boolean;
  playCompletionSound: boolean;
  showRightClickMenus: boolean;
  reminderNotifications: boolean;
  seemImportantTasksInMyDay: boolean;
  nightMode: boolean;
  showPotentialTasksInMyDay: boolean;
  showImportantList: boolean;
  showPlannedList: boolean;
  showAllList: boolean;
  showCompletedList: boolean;
  showAssignedToMeList: boolean;
  autoHideEmptySmartLists: boolean;
  showDueTodayTasksInMyDay: boolean;
  connectPlannerApp: boolean;
  emailNotifications: boolean;
}

const initialState: SettingsState = {
  confirmBeforeDeleting: true,
  addNewTasksOnTop: true,
  moveStarredTaksToTop: true,
  playCompletionSound: true,
  showRightClickMenus: true,
  reminderNotifications: true,
  seemImportantTasksInMyDay: true,
  nightMode: true,
  showPotentialTasksInMyDay: true,
  showImportantList: true,
  showPlannedList: true,
  showAllList: true,
  showCompletedList: true,
  showAssignedToMeList: true,
  autoHideEmptySmartLists: true,
  showDueTodayTasksInMyDay: true,
  connectPlannerApp: true,
  emailNotifications: true,
};

const settingsReducer = createSlice({
  name: "modals",
  initialState,
  reducers: {
    confirmBeforeDeletingToggler: (state, action: PayloadAction<boolean>) => {
      state.confirmBeforeDeleting = action.payload;
    },

    addNewTasksOnTopToggler: (state, action: PayloadAction<boolean>) => {
      state.addNewTasksOnTop = action.payload;
    },

    moveStarredTaksToTopToggler: (state, action: PayloadAction<boolean>) => {
      state.moveStarredTaksToTop = action.payload;
    },

    playCompletionSoundToggler: (state, action: PayloadAction<boolean>) => {
      state.addNewTasksOnTop = action.payload;
    },

    showRightClickMenusToggler: (state, action: PayloadAction<boolean>) => {
      state.showRightClickMenus = action.payload;
    },

    reminderNotificationsToggler: (state, action: PayloadAction<boolean>) => {
      state.reminderNotifications = action.payload;
    },

    seemImportantTasksInMyDayToggler: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.seemImportantTasksInMyDay = action.payload;
    },

    nightModeToggler: (state, action: PayloadAction<boolean>) => {
      state.nightMode = action.payload;
    },

    showPotentialTasksInMyDayToggler: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showPotentialTasksInMyDay = action.payload;
    },

    showImportantListToggler: (state, action: PayloadAction<boolean>) => {
      state.showImportantList = action.payload;
    },

    showPlannedListToggler: (state, action: PayloadAction<boolean>) => {
      state.showPlannedList = action.payload;
    },

    showAllListToggler: (state, action: PayloadAction<boolean>) => {
      state.showAllList = action.payload;
    },

    showCompletedListToggler: (state, action: PayloadAction<boolean>) => {
      state.showCompletedList = action.payload;
    },

    showAssignedToMeListToggler: (state, action: PayloadAction<boolean>) => {
      state.showAssignedToMeList = action.payload;
    },

    autoHideEmptySmartListsToggler: (state, action: PayloadAction<boolean>) => {
      state.autoHideEmptySmartLists = action.payload;
    },

    showDueTodayTasksInMyDayToggler: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showDueTodayTasksInMyDay = action.payload;
    },

    connectPlannerAppToggler: (state, action: PayloadAction<boolean>) => {
      state.connectPlannerApp = action.payload;
    },

    emailNotificationsToggler: (state, action: PayloadAction<boolean>) => {
      state.emailNotifications = action.payload;
    },
  },
});

export const {
  confirmBeforeDeletingToggler,
  addNewTasksOnTopToggler,
  moveStarredTaksToTopToggler,
  playCompletionSoundToggler,
  showRightClickMenusToggler,
  reminderNotificationsToggler,
  seemImportantTasksInMyDayToggler,
  nightModeToggler,
  showPotentialTasksInMyDayToggler,
  showImportantListToggler,
  showPlannedListToggler,
  showAllListToggler,
  showCompletedListToggler,
  showAssignedToMeListToggler,
  autoHideEmptySmartListsToggler,
  showDueTodayTasksInMyDayToggler,
  connectPlannerAppToggler,
  emailNotificationsToggler,
} = settingsReducer.actions;

export default settingsReducer.reducer;
