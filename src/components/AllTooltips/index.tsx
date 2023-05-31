import { useAppSelector } from "../../hooks/useReduxHooks";
import Tooltip from "../Tooltip/Tooltip";

const AllTooltips = () => {
  const tooltips = useAppSelector((state) => state.tooltips);

  return (
    <>
      {tooltips.dueDateTooltip.open && (
        <Tooltip
          content="Add due date"
          tooltipPosition={{
            x: tooltips.dueDateTooltip.coordinates?.x ?? 0,
            y: tooltips.dueDateTooltip.coordinates?.y ?? 0,
          }}
          trianglePosition={{
            left: "36.5px",
            top: "-8px",
          }}
        />
      )}

      {tooltips.reminderTooltip.open && (
        <Tooltip
          content="Remind me"
          tooltipPosition={{
            x: tooltips.reminderTooltip.coordinates?.x ?? 0,
            y: tooltips.reminderTooltip.coordinates?.y ?? 0,
          }}
          trianglePosition={{
            left: "31px",
            top: "-8px",
          }}
        />
      )}

      {tooltips.repeatTooltip.open && (
        <Tooltip
          content="Repeat"
          tooltipPosition={{
            x: tooltips.repeatTooltip.coordinates?.x ?? 0,
            y: tooltips.repeatTooltip.coordinates?.y ?? 0,
          }}
          trianglePosition={{
            left: "19.5px",
            top: "-8px",
          }}
        />
      )}

      {tooltips.listOptionsTooltip.open && (
        <Tooltip
          content="List options menu"
          tooltipPosition={{
            x: tooltips.listOptionsTooltip.coordinates?.x ?? 0,
            y: tooltips.listOptionsTooltip.coordinates?.y ?? 0,
          }}
          trianglePosition={{
            left: "48.75px",
            bottom: "-8px",
          }}
        />
      )}

      {tooltips.sortTooltip.open && (
        <Tooltip
          content="Sort"
          tooltipPosition={{
            x: tooltips.sortTooltip.coordinates?.x ?? 0,
            y: tooltips.sortTooltip.coordinates?.y ?? 0,
          }}
          trianglePosition={{
            left: "12.25px",
            bottom: "-8px",
          }}
        />
      )}

      {tooltips.suggestionsTooltip.open && (
        <Tooltip
          content="Suggestions"
          tooltipPosition={{
            x: tooltips.suggestionsTooltip.coordinates?.x ?? 0,
            y: tooltips.suggestionsTooltip.coordinates?.y ?? 0,
          }}
          trianglePosition={{
            left: "34.115px",
            bottom: "-8px",
          }}
        />
      )}
    </>
  );
};

export default AllTooltips;
