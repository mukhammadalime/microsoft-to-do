export const SUGGESTIONS: string = "SUGGESTIONS";
export const LIST_OPTIONS: string = "LIST_OPTIONS";
export const SORT: string = "SORT";

export const onMouseEnterHelperFn = (
  type: string,
  setListOptionsHovered: (type: boolean) => void,
  setSortHovered: (type: boolean) => void,
  setSuggestionsHovered: (type: boolean) => void,
  setTimerID: (id: NodeJS.Timeout | undefined) => void,
  setTooltipCoordinates: ({ x, y }: { x: number; y: number }) => void
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

  const searchTooltipPosition = tooltipHost.getBoundingClientRect();
  setTooltipCoordinates({
    x: searchTooltipPosition.left,
    y: searchTooltipPosition.top,
  });

  switch (type) {
    case LIST_OPTIONS:
      const id = setTimeout(() => setListOptionsHovered(true), 300);

      setTimerID(id);
      break;
    case SORT:
      const id2 = setTimeout(() => setSortHovered(true), 300);
      setTimerID(id2);
      break;
    case SUGGESTIONS:
      const id3 = setTimeout(() => setSuggestionsHovered(true), 300);
      setTimerID(id3);
      break;
  }
};

export const onMouseLeaveHelperFn = (
  type: string,
  timerID: NodeJS.Timeout | undefined,
  setListOptionsHovered: (type: boolean) => void,
  setSortHovered: (type: boolean) => void,
  setSuggestionsHovered: (type: boolean) => void
) => {
  clearTimeout(timerID);

  switch (type) {
    case LIST_OPTIONS:
      setListOptionsHovered(false);
      break;
    case SORT:
      setSortHovered(false);
      break;
    case SUGGESTIONS:
      setSuggestionsHovered(false);
      break;
  }
};
