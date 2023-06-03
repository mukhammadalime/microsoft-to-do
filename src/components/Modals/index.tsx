import React from "react";
import DueDateModal from "./DueDateModal";
import CalendarModal from "./CalendarModal";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import CustomRepeatModal from "./CustomRepeatModal";
import TimeOptionsModal from "./TimeOptionsModal";

import RemindMeModal from "./RemindMeModal";
import RepeatModal from "./RepeatModal";
import ListOptionsMenuModal from "./ListOptionsModal";
import {
  calendarModalToggler,
  customRepeatModalToggler,
  dueDateModalToggler,
  listActionsModalToggler,
  listOptionsModalToggler,
  remindMeModalToggler,
  repeatModalToggler,
  sortModalToggler,
  timeOptionsModalToggler,
} from "../../store/reducers/modalsReducer";
import {
  dueDateTooltipToggler,
  remindMeTooltipToggler,
  repeatTooltipToggler,
} from "../../store/reducers/tooltipsReducer";
import ListActionsModal from "./ListActionsModal";
import SortModal from "./SortModal";

const AllModals = () => {
  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state) => state);

  return (
    <>
      {/* MODALS */}

      {/* Calendar Modal */}
      {modals.calendarModal.open && (
        <CalendarModal
          onClose={() => dispatch(calendarModalToggler({ open: false }))}
          time={modals.calendarModal.timeForCalendar}
        />
      )}

      {/* Custom Repeat Modal */}
      {modals.customRepeatModal.open && (
        <CustomRepeatModal
          onClose={() => dispatch(customRepeatModalToggler({ open: false }))}
        />
      )}

      {/* Due Date Modal */}
      {modals.dueDateModal.open && (
        <DueDateModal
          onClose={() => {
            dispatch(dueDateModalToggler({ open: false }));
            dispatch(dueDateTooltipToggler({ open: false }));
          }}
        />
      )}

      {/* Group Actions Modal */}

      {/* Groups Modal */}

      {/* List Actions Modal */}
      {modals.listActionsModal.open && (
        <ListActionsModal
          onClose={() => dispatch(listActionsModalToggler({ open: false }))}
          tasksList={
            modals.listActionsModal.actionsDisabled === "limited" && true
          }
        />
      )}

      {/* List Options Modal */}
      {modals.listOptionsModal.open && (
        <ListOptionsMenuModal
          onClose={() => dispatch(listOptionsModalToggler({ open: false }))}
        />
      )}

      {/* Reminder Modal */}
      {modals.remindMeModal.open && (
        <RemindMeModal
          onClose={() => {
            dispatch(remindMeModalToggler({ open: false }));
            dispatch(remindMeTooltipToggler({ open: false }));
          }}
        />
      )}

      {/* Repeat Modal */}
      {modals.repeatModal.open && (
        <RepeatModal
          onClose={() => {
            dispatch(repeatModalToggler({ open: false }));
            dispatch(repeatTooltipToggler({ open: false }));
          }}
        />
      )}

      {/* Time Options Modal */}
      {modals.timeOptionsModal.open && (
        <TimeOptionsModal
          onClose={() => dispatch(timeOptionsModalToggler({ open: false }))}
        />
      )}

      {/* Sort Modal */}
      {modals.sortModal.open && (
        <SortModal
          onClose={() => dispatch(sortModalToggler({ open: false }))}
        />
      )}
    </>
  );
};

export default AllModals;
