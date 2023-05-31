import { CoordinatesTypes } from "../../types/designTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface TooltipItemType {
  open: boolean;
  coordinates?: CoordinatesTypes;
}

export interface TooltipsStateType {
  dueDateTooltip: TooltipItemType;
  listOptionsTooltip: TooltipItemType;
  sortTooltip: TooltipItemType;
  remindMeTooltip: TooltipItemType;
  repeatTooltip: TooltipItemType;
  suggestionsTooltip: TooltipItemType;
}

const initialTooltipState: TooltipItemType = {
  open: false,
  coordinates: { left: 0, top: 0 },
};

export const initialState: TooltipsStateType = {
  dueDateTooltip: initialTooltipState,
  listOptionsTooltip: initialTooltipState,
  sortTooltip: initialTooltipState,
  remindMeTooltip: initialTooltipState,
  repeatTooltip: initialTooltipState,
  suggestionsTooltip: initialTooltipState,
};

const tooltipsSlice = createSlice({
  name: "tooltips",
  initialState,
  reducers: {
    dueDateTooltipToggler: (
      state,
      action: PayloadAction<{
        open: boolean;
        coordinates?: CoordinatesTypes;
      }>
    ) => {
      state.dueDateTooltip.open = action.payload.open;
      state.dueDateTooltip.coordinates = action.payload.coordinates ?? {
        left: 0,
        top: 0,
      };
    },

    listOptionsTooltipToggler: (
      state,
      action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    ) => {
      state.listOptionsTooltip.open = action.payload.open;
      state.listOptionsTooltip.coordinates =
        action.payload.coordinates ?? state.listOptionsTooltip.coordinates;
    },

    sortTooltipToggler: (
      state,
      action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    ) => {
      state.sortTooltip.open = action.payload.open;
      state.sortTooltip.coordinates = action.payload.coordinates ?? {
        left: 0,
        top: 0,
      };
    },

    remindMeTooltipToggler: (
      state,
      action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    ) => {
      state.remindMeTooltip.open = action.payload.open;
      state.remindMeTooltip.coordinates = action.payload.coordinates ?? {
        left: 0,
        top: 0,
      };
    },

    repeatTooltipToggler: (
      state,
      action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    ) => {
      state.repeatTooltip.open = action.payload.open;
      state.repeatTooltip.coordinates = action.payload.coordinates ?? {
        left: 0,
        top: 0,
      };
    },

    suggestionsTooltipToggler: (
      state,
      action: PayloadAction<{ open: boolean; coordinates?: CoordinatesTypes }>
    ) => {
      state.suggestionsTooltip.open = action.payload.open;
      state.suggestionsTooltip.coordinates = action.payload.coordinates ?? {
        left: 0,
        top: 0,
      };
    },
  },
});

export const {
  dueDateTooltipToggler,
  listOptionsTooltipToggler,
  sortTooltipToggler,
  remindMeTooltipToggler,
  repeatTooltipToggler,
  suggestionsTooltipToggler,
} = tooltipsSlice.actions;

export default tooltipsSlice.reducer;
