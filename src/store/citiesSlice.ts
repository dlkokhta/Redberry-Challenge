import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface types {
  id: any;
  name: string;
  sitiesId: number;
}

interface citiesTypes {
  cities: types[];
}

const initialState: citiesTypes = {
  cities: [],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<types[]>) => {
      state.cities = action.payload;
    },
  },
});

export const { setCities } = citiesSlice.actions;
export default citiesSlice.reducer;
