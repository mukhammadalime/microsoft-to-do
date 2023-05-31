import React from "react";
import DueDateModal from "./DueDateModal";
import CalendarModal from "./CalendarModal";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import CustomRepeatModal from "./CustomRepeatModal";
import TimeOptionsModal from "./TimeOptionsModal";
import {
  deuDateTooltipToggle,
  reminderTooltipToggle,
  repeatTooltipToggle,
} from "../../store/action-creators/tooltipsActions";
import RemindMeModal from "./RemindMeModal";
import RepeatModal from "./RepeatModal";
import ListOptionsMenuModal from "./ListOptionsModal";
import {
  calendarModalToggler,
  customRepeatModalToggler,
  dueDateModalToggler,
  listOptionsModalToggler,
  remindMeModalToggler,
  repeatModalToggler,
  timeOptionsModalToggler,
} from "../../store/reducers/modalsReducer";

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
            deuDateTooltipToggle(false);
          }}
        />
      )}

      {/* Group Actions Modal */}

      {/* Groups Modal */}

      {/* List Actions Modal */}

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
            dispatch(reminderTooltipToggle(false));
          }}
        />
      )}

      {/* Repeat Modal */}
      {modals.repeatModal.open && (
        <RepeatModal
          onClose={() => {
            dispatch(repeatModalToggler({ open: false }));
            dispatch(repeatTooltipToggle(false));
          }}
        />
      )}

      {/* Time Options Modal */}
      {modals.timeOptionsModal.open && (
        <TimeOptionsModal
          onClose={() => dispatch(timeOptionsModalToggler({ open: false }))}
        />
      )}
    </>
  );
};

export default AllModals;
