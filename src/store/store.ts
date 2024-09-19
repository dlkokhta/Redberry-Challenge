import { configureStore } from "@reduxjs/toolkit";
import regionSlice from "./regionsSlice";
import citiesSlice from "./citiesSlice";
import agentsSlice from "./agentSlice";
import realEstatesSlice from "./realEstatesSlice";

const store = configureStore({
  reducer: {
    region: regionSlice,
    cities: citiesSlice,
    agents: agentsSlice,
    realEstates: realEstatesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
