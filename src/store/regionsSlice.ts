import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface types {
  id: any;
  name: string;
  regionId: number;
}

interface regionTypes {
  region: types[];
}

const initialState: regionTypes = {
  region: [],
};

const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    setRegion: (state, action: PayloadAction<types[]>) => {
      state.region = action.payload;
    },
  },
});

export const { setRegion } = regionSlice.actions;
export default regionSlice.reducer;
