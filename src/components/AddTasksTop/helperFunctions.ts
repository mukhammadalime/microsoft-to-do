import { AppDispatch } from "../../store";
import {
  listOptionsTooltipToggle,
  sortTooltipToggle,
  suggestionsTooltipToggle,
} from "../../store/action-creators/tooltipsActions";

export const SUGGESTIONS: string = "SUGGESTIONS";
export const LIST_OPTIONS: string = "LIST_OPTIONS";
export const SORT: string = "SORT";

export const onMouseEnterHelperFn = (
  type: string,

  setTimerID: (id: NodeJS.Timeout | undefined) => void,
  setTooltipCoordinates: ({ x, y }: { x: number; y: number }) => void,
  dispatch: AppDispatch
) => {
  const tooltipHostClassname =
    type === LIST_OPTIONS
      ? ".list-options-tooltip-host"
      : type === SORT
      ? ".sort-tooltip-host"
      : ".suggestions-tooltip-host";

  const tooltipHost = document.querySelector(
    tooltipHostClassname
  ) as HTMLDivElement;

  const tooltipPosition = tooltipHost.getBoundingClientRect();
  setTooltipCoordinates({
    x: tooltipPosition.left,
    y: tooltipPosition.top,
  });

  switch (type) {
    case LIST_OPTIONS:
      const id = setTimeout(() => {
        dispatch(
          listOptionsTooltipToggle(true, {
            x: tooltipPosition.left - 40,
            y: tooltipPosition.top - 35,
          })
        );
      }, 300);

      setTimerID(id);
      break;
    case SORT:
      const id2 = setTimeout(() => {
        dispatch(
          sortTooltipToggle(true, {
            x: tooltipPosition.left + 16.595,
            y: tooltipPosition.top - 35,
          })
        );
      }, 300);
      setTimerID(id2);
      break;
    case SUGGESTIONS:
      const id3 = setTimeout(() => {
        dispatch(
          suggestionsTooltipToggle(true, {
            x: tooltipPosition.left + 20.415,
            y: tooltipPosition.top - 35,
          })
        );
      }, 300);
      setTimerID(id3);
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
      dispatch(listOptionsTooltipToggle(false));
      break;
    case SORT:
      dispatch(sortTooltipToggle(false));
      break;
    case SUGGESTIONS:
      dispatch(suggestionsTooltipToggle(false));
      break;
  }
};
