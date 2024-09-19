import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Region {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
  region_id: number;
  region: Region;
}

interface Property {
  id: number;
  address: string;
  zip_code: string;
  price: number;
  area: number;
  bedrooms: number;
  image: string;
  is_rental: number;
  city_id: number;
  city: City;
}

interface realEstatesTypes {
  realEstates: Property[];
}

const initialState: realEstatesTypes = {
  realEstates: [],
};

const realEstatesSlice = createSlice({
  name: "realEstates",
  initialState,
  reducers: {
    setRealEstates: (state, action: PayloadAction<Property[]>) => {
      state.realEstates = action.payload;
    },
  },
});

export const { setRealEstates } = realEstatesSlice.actions;
export default realEstatesSlice.reducer;
