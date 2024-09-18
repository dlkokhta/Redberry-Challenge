import { configureStore } from "@reduxjs/toolkit";
import regionSlice from "./regionsSlice";

const store = configureStore({
  reducer: {
    region: regionSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
