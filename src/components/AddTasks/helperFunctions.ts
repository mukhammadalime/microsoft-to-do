import { AppDispatch } from "../../store";
import {
  deuDateTooltipToggle,
  reminderTooltipToggle,
  repeatTooltipToggle,
} from "../../store/action-creators/tooltipsActions";
import {
  dueDateModalToggler,
  remindMeModalToggler,
  repeatModalToggler,
} from "../../store/reducers/modalsReducer";

export const DUE_DATE: string = "DUE_DATE";
export const REMIND_ME: string = "REMIN_DME";
export const REPEAT: string = "REPEAT";

export const onBtnOpenHelperFn = (
  type: string,
  timerID: NodeJS.Timeout | undefined,
  dispatch: AppDispatch
) => {
  clearTimeout(timerID);
  const tooltipHostClassname =
    type === DUE_DATE
      ? ".due-date-tooltip-host"
      : type === REMIND_ME
      ? ".remind-me-tooltip-host"
      : ".repeat-tooltip-host";

  const tooltipHost = document.querySelector(
    tooltipHostClassname
  ) as HTMLDivElement;
  const tooltipHostPosition = tooltipHost.getBoundingClientRect();

  switch (type) {
    case DUE_DATE:
      dispatch(
        dueDateModalToggler({
          open: true,
          coordinates: {
            x: tooltipHostPosition.left - (100 - tooltipHost.offsetWidth / 2),
            y: tooltipHostPosition.top + 28,
          },
        })
      );
      break;
    case REMIND_ME:
      dispatch(
        remindMeModalToggler({
          open: true,
          coordinates: {
            x: tooltipHostPosition.left - (111.5 - tooltipHost.offsetWidth / 2),
            y: tooltipHostPosition.top + 28,
          },
        })
      );

      break;
    case REPEAT:
      dispatch(
        repeatModalToggler({
          open: true,
          coordinates: {
            x: tooltipHostPosition.left - (100 - tooltipHost.offsetWidth / 2),
            y: tooltipHostPosition.top + 28,
          },
        })
      );
      break;
  }
};

export const onMouseEnterHelperFn = (
  type: string,
  setTimerID: (id: NodeJS.Timeout | undefined) => void,
  dispatch: AppDispatch
) => {
  const tooltipHostClassname =
    type === DUE_DATE
      ? ".due-date-tooltip-host"
      : type === REMIND_ME
      ? ".remind-me-tooltip-host"
      : ".repeat-tooltip-host";

  const tooltipHost = document.querySelector(
    tooltipHostClassname
  ) as HTMLDivElement;

  const tooltipPosition = tooltipHost.getBoundingClientRect();

  switch (type) {
    case DUE_DATE:
      const id = setTimeout(() => {
        deuDateTooltipToggle(true, {
          x: tooltipPosition.left - (44.5 - tooltipHost.offsetWidth / 2),
          y: tooltipPosition.top + 39,
        });
      }, 300);
      setTimerID(id);
      break;
    case REMIND_ME:
      const id2 = setTimeout(() => {
        dispatch(
          reminderTooltipToggle(true, {
            x: tooltipPosition.left - (39 - tooltipHost.offsetWidth / 2),
            y: tooltipPosition.top + 39,
          })
        );
      }, 300);
      setTimerID(id2);
      break;
    case REPEAT:
      const id3 = setTimeout(() => {
        dispatch(
          repeatTooltipToggle(true, {
            x: tooltipPosition.left - (27.5 - tooltipHost.offsetWidth / 2),
            y: tooltipPosition.top + 39,
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
    case DUE_DATE:
      deuDateTooltipToggle(false);
      break;
    case REMIND_ME:
      dispatch(reminderTooltipToggle(false));
      break;
    case REPEAT:
      dispatch(repeatTooltipToggle(false));

      break;
  }
};
