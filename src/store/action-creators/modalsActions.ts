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
import { CoordinatesTypes } from "../../types/designTypes";

const helperModalToggle = (
  type: boolean,
  openConstant: string,
  closeConstant: string,
  coordinates?: CoordinatesTypes,
  timeForCalendar?: boolean,
  actionsLimited?: boolean
) => {
  return {
    type: type ? openConstant : closeConstant,
    payload: {
      open: type ? true : false,
      coordinates: coordinates,
      timeForCalendar,
      actionsLimited,
    },
  };
};

export const deuDateModalToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes
) =>
  helperModalToggle(
    type,
    DUE_DATE_MODAL_OPEN,
    DUE_DATE_MODAL_CLOSE,
    coordinates
  );

export const reminderModalToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes
) =>
  helperModalToggle(
    type,
    REMINDER_MODAL_OPEN,
    REMINDER_MODAL_CLOSE,
    coordinates
  );

export const sortModalToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes
) => helperModalToggle(type, SORT_MODAL_OPEN, SORT_MODAL_CLOSE, coordinates);

export const pickDateModalToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes
) =>
  helperModalToggle(
    type,
    PICK_DATE_MODAL_OPEN,
    PICK_DATE_MODAL_CLOSE,
    coordinates
  );

export const listOptionsModalToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes
) =>
  helperModalToggle(
    type,
    LIST_OPTIONS_MODAL_OPEN,
    LIST_OPTIONS_MODAL_CLOSE,
    coordinates
  );

export const pickDateAndTimeModalToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes
) =>
  helperModalToggle(
    type,
    PICK_DATE_AND_TIME_MODAL_OPEN,
    PICK_DATE_AND_TIME_MODAL_CLOSE,
    coordinates
  );

export const repeatModalToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes
) =>
  helperModalToggle(type, REPEAT_MODAL_OPEN, REPEAT_MODAL_CLOSE, coordinates);

export const customRepeatModalToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes
) =>
  helperModalToggle(
    type,
    CUSTOM_REPEAT_MODAL_OPEN,
    CUSTOM_REPEAT_MODAL_CLOSE,
    coordinates
  );

export const timeOptionsModalToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes
) =>
  helperModalToggle(
    type,
    TIME_OPTIONS_MODAL_OPEN,
    TIME_OPTIONS_MODAL_CLOSE,
    coordinates
  );

export const calendarModalToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes,
  timeForCalendar?: boolean
) =>
  helperModalToggle(
    type,
    CALENDAR_MODAL_OPEN,
    CALENDAR_MODAL_CLOSE,
    coordinates,
    timeForCalendar
  );

export const listActionsModalToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes,
  actionsLimited?: boolean
) =>
  helperModalToggle(
    type,
    LIST_ACTIONS_MODAL_OPEN,
    LIST_ACTIONS_MODAL_CLOSE,
    coordinates,
    false,
    actionsLimited
  );

export const groupActionsModalToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes
) =>
  helperModalToggle(
    type,
    GROUP_ACTIONS_MODAL_OPEN,
    GROUP_ACTIONS_MODAL_CLOSE,
    coordinates
  );

export const groupsModalToggle = (
  type: boolean,
  coordinates?: CoordinatesTypes
) =>
  helperModalToggle(type, GROUPS_MODAL_OPEN, GROUPS_MODAL_CLOSE, coordinates);
