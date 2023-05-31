import { configureStore } from "@reduxjs/toolkit";
import modalsReducer from "./reducers/modalsReducer";
import { tooltipReducer } from "./reducers/tooltipsReducer";

const store = configureStore({
  reducer: {
    modals: modalsReducer,
    tooltips: tooltipReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
