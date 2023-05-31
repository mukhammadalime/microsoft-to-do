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
            left: tooltips.dueDateTooltip.coordinates?.left ?? 0,
            top: tooltips.dueDateTooltip.coordinates?.top ?? 0,
          }}
          trianglePosition={{
            left: "36.5px",
            top: "-8px",
          }}
        />
      )}

      {tooltips.remindMeTooltip.open && (
        <Tooltip
          content="Remind me"
          tooltipPosition={{
            left: tooltips.remindMeTooltip.coordinates?.left ?? 0,
            top: tooltips.remindMeTooltip.coordinates?.top ?? 0,
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
            left: tooltips.repeatTooltip.coordinates?.left ?? 0,
            top: tooltips.repeatTooltip.coordinates?.top ?? 0,
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
            left: tooltips.listOptionsTooltip.coordinates?.left ?? 0,
            top: tooltips.listOptionsTooltip.coordinates?.top ?? 0,
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
            left: tooltips.sortTooltip.coordinates?.left ?? 0,
            top: tooltips.sortTooltip.coordinates?.top ?? 0,
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
            left: tooltips.suggestionsTooltip.coordinates?.left ?? 0,
            top: tooltips.suggestionsTooltip.coordinates?.top ?? 0,
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
