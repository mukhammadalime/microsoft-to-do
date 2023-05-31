import { Reducer } from "redux";
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
import { TooltipsActions } from "../actions";
import { CoordinatesTypes } from "../../types/designTypes";

export interface TooltipItemType {
  open: boolean;
  coordinates?: CoordinatesTypes;
}

export interface TooltipsStateType {
  dueDateTooltip: TooltipItemType;
  listOptionsTooltip: TooltipItemType;
  sortTooltip: TooltipItemType;
  reminderTooltip: TooltipItemType;
  repeatTooltip: TooltipItemType;
  suggestionsTooltip: TooltipItemType;
}

const initialTooltipState: TooltipItemType = {
  open: false,
  coordinates: { x: 0, y: 0 },
};

export const initialTooltipsState: TooltipsStateType = {
  listOptionsTooltip: initialTooltipState,
  sortTooltip: initialTooltipState,
  dueDateTooltip: initialTooltipState,
  reminderTooltip: initialTooltipState,
  repeatTooltip: initialTooltipState,
  suggestionsTooltip: initialTooltipState,
};

export const tooltipReducer: Reducer<TooltipsStateType, TooltipsActions> = (
  state: TooltipsStateType = initialTooltipsState,
  action: TooltipsActions
) => {
  switch (action.type) {
    case LIST_OPTIONS_TOOLTIP_OPEN:
      return { ...state, listOptionsTooltip: action.payload };
    case LIST_OPTIONS_TOOLTIP_CLOSE:
      return { ...state, listOptionsTooltip: action.payload };

    case SORT_TOOLTIP_OPEN:
      return { ...state, sortTooltip: action.payload };
    case SORT_TOOLTIP_CLOSE:
      return { ...state, sortTooltip: action.payload };

    case SUGGESTIONS_TOOLTIP_OPEN:
      return { ...state, suggestionsTooltip: action.payload };
    case SUGGESTIONS_TOOLTIP_CLOSE:
      return { ...state, suggestionsTooltip: action.payload };

    case DUE_DATE_TOOLTIP_OPEN:
      return {
        ...state,
        dueDateTooltip: action.payload,
      };
    case DUE_DATE_TOOLTIP_CLOSE:
      return {
        ...state,
        dueDateTooltip: action.payload,
      };

    case REMINDER_TOOLTIP_OPEN:
      return { ...state, reminderTooltip: action.payload };
    case REMINDER_TOOLTIP_CLOSE:
      return { ...state, reminderTooltip: action.payload };

    case REPEAT_TOOLTIP_OPEN:
      return { ...state, repeatTooltip: action.payload };
    case REPEAT_TOOLTIP_CLOSE:
      return { ...state, repeatTooltip: action.payload };

    default:
      return state;
  }
};
