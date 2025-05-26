import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./reducers/projectsReducers";

export const store = configureStore({
  reducer: {
    // reducers
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
