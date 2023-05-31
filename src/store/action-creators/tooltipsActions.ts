import {
  DUE_DATE_TOOLTIP_CLOSE,
  DUE_DATE_TOOLTIP_OPEN,
  LIST_OPTIONS_TOOLTIP_CLOSE,
  LIST_OPTIONS_TOOLTIP_OPEN,
  REMINDER_TOOLTIP_CLOSE,
  REMINDER_TOOLTIP_OPEN,
  REPEAT_TOOLTIP_CLOSE,
  REPEAT_TOOLTIP_OPEN,
  SORT_TOOLTIP_CLOSE,
  SORT_TOOLTIP_OPEN,
  SUGGESTIONS_TOOLTIP_CLOSE,
  SUGGESTIONS_TOOLTIP_OPEN,
} from "../constants/tooltipsConstants";
import { CoordinatesTypes } from "../../types/designTypes";
import { AppDispatch } from "..";
import { RootState } from "..";

const helperTooltipToggle = (
  type: boolean,
  openConstant: string,
  closeConstant: string,
  coordinates?: CoordinatesTypes
) => {
  return {
    type: type ? openConstant : closeConstant,
    payload: {
      open: type ? true : false,
      coordinates: coordinates,
    },
  };
};

export const deuDateTooltipToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes
) => {
  return (dispatch: AppDispatch, getState: RootState) => {
    dispatch({
      type: type ? DUE_DATE_TOOLTIP_OPEN : DUE_DATE_TOOLTIP_CLOSE,
      payload: {
        open: type ? true : false,
        coordinates: coordinates,
      },
    });
  };
};

export const reminderTooltipToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes
) =>
  helperTooltipToggle(
    type,
    REMINDER_TOOLTIP_OPEN,
    REMINDER_TOOLTIP_CLOSE,
    coordinates
  );

export const sortTooltipToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes
) =>
  helperTooltipToggle(type, SORT_TOOLTIP_OPEN, SORT_TOOLTIP_CLOSE, coordinates);

export const listOptionsTooltipToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes
) =>
  helperTooltipToggle(
    type,
    LIST_OPTIONS_TOOLTIP_OPEN,
    LIST_OPTIONS_TOOLTIP_CLOSE,
    coordinates
  );

export const repeatTooltipToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes
) =>
  helperTooltipToggle(
    type,
    REPEAT_TOOLTIP_OPEN,
    REPEAT_TOOLTIP_CLOSE,
    coordinates
  );

export const suggestionsTooltipToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes
) =>
  helperTooltipToggle(
    type,
    SUGGESTIONS_TOOLTIP_OPEN,
    SUGGESTIONS_TOOLTIP_CLOSE,
    coordinates
  );
