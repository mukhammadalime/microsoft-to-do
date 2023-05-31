import React from "react";
import DueDateModal from "../Modals/DueDateModal";
import CalendarModal from "../Modals/CalendarModal";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import {
  calendarModalToggle,
  customRepeatModalToggle,
  deuDateModalToggle,
  timeOptionsModalToggle,
} from "../../store/action-creators/modalsActions";
import CustomRepeatModal from "../Modals/CustomRepeatModal";
import TimeOptionsModal from "../Modals/TimeOptionsModal";

const AllModals = () => {
  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state) => state);

  return (
    <>
      {/* MODALS */}
      {/* {modals.dueDateModal.open && (
        <DueDateModal
          onClose={() => {
            dispatch(deuDateModalToggle(false));
            setDueDateHovered(false);
          }}
        />
      )} */}

      {modals.calendarModal.open && (
        <CalendarModal
          onClose={() => dispatch(calendarModalToggle(false))}
          time={modals.calendarModal.timeForCalendar}
        />
      )}

      {/* {modals.reminderModal.open && (
        <RemindMeModal
          onClose={() => {
            dispatch(reminderModalToggle(false));
            setRemindMeHovered(false);
          }}
        />
      )}

      {modals.repeatModal.open && (
        <RepeatModal
          onClose={() => {
            dispatch(repeatModalToggle(false));
            setRepeatHovered(false);
          }}
        />
      )} */}

      {modals.customRepeatModal.open && (
        <CustomRepeatModal
          onClose={() => dispatch(customRepeatModalToggle(false))}
        />
      )}

      {modals.timeOptionsModal.open && (
        <TimeOptionsModal
          onClose={() => dispatch(timeOptionsModalToggle(false))}
        />
      )}
    </>
  );
};

export default AllModals;
