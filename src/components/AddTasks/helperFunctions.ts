import { AppDispatch } from "../../store";
import {
  dueDateModalToggler,
  remindMeModalToggler,
  repeatModalToggler,
} from "../../store/reducers/modalsReducer";
import {
  dueDateTooltipToggler,
  remindMeTooltipToggler,
  repeatTooltipToggler,
} from "../../store/reducers/tooltipsReducer";

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
            left:
              tooltipHostPosition.left - (100 - tooltipHost.offsetWidth / 2),
            top: tooltipHostPosition.top + 28,
          },
        })
      );
      break;
    case REMIND_ME:
      dispatch(
        remindMeModalToggler({
          open: true,
          coordinates: {
            left:
              tooltipHostPosition.left - (111.5 - tooltipHost.offsetWidth / 2),
            top: tooltipHostPosition.top + 28,
          },
        })
      );

      break;
    case REPEAT:
      dispatch(
        repeatModalToggler({
          open: true,
          coordinates: {
            left:
              tooltipHostPosition.left - (100 - tooltipHost.offsetWidth / 2),
            top: tooltipHostPosition.top + 28,
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
        dispatch(
          dueDateTooltipToggler({
            open: true,
            coordinates: {
              left: tooltipPosition.left - (44.5 - tooltipHost.offsetWidth / 2),
              top: tooltipPosition.top + 39,
            },
          })
        );
      }, 300);
      setTimerID(id);
      break;
    case REMIND_ME:
      const id2 = setTimeout(() => {
        dispatch(
          remindMeTooltipToggler({
            open: true,
            coordinates: {
              left: tooltipPosition.left - (39 - tooltipHost.offsetWidth / 2),
              top: tooltipPosition.top + 39,
            },
          })
        );
      }, 300);
      setTimerID(id2);
      break;
    case REPEAT:
      const id3 = setTimeout(() => {
        dispatch(
          repeatTooltipToggler({
            open: true,
            coordinates: {
              left: tooltipPosition.left - (27.5 - tooltipHost.offsetWidth / 2),
              top: tooltipPosition.top + 39,
            },
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
      dispatch(dueDateTooltipToggler({ open: false }));
      break;
    case REMIND_ME:
      dispatch(remindMeTooltipToggler({ open: false }));
      break;
    case REPEAT:
      dispatch(repeatTooltipToggler({ open: false }));

      break;
  }
};
