import { configureStore } from "@reduxjs/toolkit";
import regionSlice from "./regionsSlice";
import citiesSlice from "./citiesSlice";

const store = configureStore({
  reducer: {
    region: regionSlice,
    cities: citiesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
