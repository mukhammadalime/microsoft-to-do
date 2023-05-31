// import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
// import { deuDateModalToggle } from "../../store/action-creators/modalsActions";
// import { DUE_DATE_MODAL_OPEN } from "../../store/constants/modalsConstants";
// import { CoordinatesTypes } from "../../types/designTypes";

// const AllModals = ({
//   type,
//   coordinates,
// }: {
//   type: string;
//   coordinates: CoordinatesTypes;
// }) => {
//   /// REDUX
//   const dispatch = useAppDispatch();
//   const {
//     dueDateModal,
//     reminderModalOpen,
//     repeatModalOpen,
//     calendarModalOpen,
//   } = useAppSelector((state) => state.modals);

//   switch (type) {
//     case DUE_DATE_MODAL_OPEN:
//       return (
//         <DueDateOptionsModal
//           onClose={() => {
//             dispatch(deuDateModalToggle(false));
//             setDueDateHovered(false);
//           }}
//           coordinates={coordinates}
//         />
//       );

//     default:
//       break;
//   }
// };

// export default AllModals;
import React from "react";

const AllModals = () => {
  return <div>AllModals</div>;
};

export default AllModals;
