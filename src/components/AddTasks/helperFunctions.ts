import { bindActionCreators } from "redux";
import { AppDispatch, modalActionCreators } from "../../store";

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

  const { deuDateModalToggle, reminderModalToggle, repeatModalToggle } =
    bindActionCreators(modalActionCreators, dispatch);

  switch (type) {
    case DUE_DATE:
      deuDateModalToggle(true, {
        x: tooltipHostPosition.left - (100 - tooltipHost.offsetWidth / 2),
        y: tooltipHostPosition.top + 28,
      });
      break;
    case REMIND_ME:
      reminderModalToggle(true, {
        x: tooltipHostPosition.left - (111.5 - tooltipHost.offsetWidth / 2),
        y: tooltipHostPosition.top + 28,
      });

      break;
    case REPEAT:
      repeatModalToggle(true, {
        x: tooltipHostPosition.left - (100 - tooltipHost.offsetWidth / 2),
        y: tooltipHostPosition.top + 28,
      });
      break;
  }
};

export const onMouseEnterHelperFn = (
  type: string,
  setTooltipHostWidth: (number: number) => void,
  setTooltipCoordinates: ({ x, y }: { x: number; y: number }) => void,
  setDueDateHovered: (type: boolean) => void,
  setRemindMeHovered: (type: boolean) => void,
  setRepeatHovered: (type: boolean) => void,
  setTimerID: (id: NodeJS.Timeout | undefined) => void
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

  setTooltipHostWidth(tooltipHost.offsetWidth);

  const searchTooltipPosition = tooltipHost.getBoundingClientRect();
  setTooltipCoordinates({
    x: searchTooltipPosition.left,
    y: searchTooltipPosition.top,
  });

  switch (type) {
    case DUE_DATE:
      const id = setTimeout(() => setDueDateHovered(true), 300);
      setTimerID(id);
      break;
    case REMIND_ME:
      const id2 = setTimeout(() => setRemindMeHovered(true), 300);
      setTimerID(id2);
      break;
    case REPEAT:
      const id3 = setTimeout(() => setRepeatHovered(true), 300);
      setTimerID(id3);
      break;
  }
};

export const onMouseLeaveHelperFn = (
  type: string,
  timerID: NodeJS.Timeout | undefined,
  setDueDateHovered: (type: boolean) => void,
  setRemindMeHovered: (type: boolean) => void,
  setRepeatHovered: (type: boolean) => void
) => {
  clearTimeout(timerID);

  switch (type) {
    case DUE_DATE:
      setDueDateHovered(false);
      break;
    case REMIND_ME:
      setRemindMeHovered(false);
      break;
    case REPEAT:
      setRepeatHovered(false);
      break;
  }
};
