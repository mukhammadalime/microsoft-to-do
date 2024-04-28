import { AppDispatch } from "../../store";
import {
  groupTooltipToggler,
  listOptionsTooltipToggler,
  sortTooltipToggler,
  suggestionsTooltipToggler,
} from "../../store/reducers/tooltipsReducer";
import { CoordinatesTypes } from "../../types/designTypes";

export const SUGGESTIONS: string = "SUGGESTIONS";
export const LIST_OPTIONS: string = "LIST_OPTIONS";
export const SORT: string = "SORT";
export const GROUP: string = "GROUP";

export const onMouseEnterHelperFn = (
  type: string,
  setTimerID: (id: NodeJS.Timeout | undefined) => void,
  setTooltipCoordinates: ({ left, top }: CoordinatesTypes) => void,
  dispatch: AppDispatch
) => {
  const tooltipHostClassname =
    type === LIST_OPTIONS
      ? ".list-options-tooltip-host"
      : type === SORT
      ? ".sort-tooltip-host"
      : type === GROUP
      ? ".group-tooltip-host"
      : ".suggestions-tooltip-host";

  const tooltipHost = document.querySelector(
    tooltipHostClassname
  ) as HTMLDivElement;
  console.log("tooltipHost:", tooltipHost.clientWidth);

  const tooltipPosition = tooltipHost.getBoundingClientRect();
  setTooltipCoordinates({
    left: tooltipPosition.left,
    top: tooltipPosition.top,
  });

  switch (type) {
    case LIST_OPTIONS:
      const id = setTimeout(() => {
        dispatch(
          listOptionsTooltipToggler({
            open: true,
            coordinates: {
              left: tooltipPosition.left - 40,
              top: tooltipPosition.top - 35,
            },
          })
        );
      }, 300);

      setTimerID(id);
      break;
    case SORT:
      const id2 = setTimeout(() => {
        dispatch(
          sortTooltipToggler({
            open: true,
            coordinates: {
              left: tooltipPosition.left + 16.595,
              top: tooltipPosition.top - 35,
            },
          })
        );
      }, 300);
      setTimerID(id2);
      break;
    case GROUP:
      const id3 = setTimeout(() => {
        dispatch(
          groupTooltipToggler({
            open: true,
            coordinates: {
              left: tooltipPosition.left + 18.5,
              top: tooltipPosition.top - 35,
            },
          })
        );
      }, 300);
      setTimerID(id3);
      break;
    case SUGGESTIONS:
      const id4 = setTimeout(() => {
        dispatch(
          suggestionsTooltipToggler({
            open: true,
            coordinates: {
              left: tooltipPosition.left + 20.415,
              top: tooltipPosition.top - 35,
            },
          })
        );
      }, 300);
      setTimerID(id4);
      break;
  }
};

export const onMouseLeaveHelperFn = (
  type: string,
  timerID: NodeJS.Timeout | undefined,

  dispatch: AppDispatch
) => {
  clearTimeout(timerID);

  switch (type) {
    case LIST_OPTIONS:
      dispatch(listOptionsTooltipToggler({ open: false }));
      break;
    case SORT:
      dispatch(sortTooltipToggler({ open: false }));
      break;
    case GROUP:
      dispatch(groupTooltipToggler({ open: false }));
      break;
    case SUGGESTIONS:
      dispatch(suggestionsTooltipToggler({ open: false }));
      break;
  }
};
