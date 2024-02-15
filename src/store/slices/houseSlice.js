import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: undefined,
  categories: undefined,
  provinces: undefined,
  districts: undefined,
  wards: undefined,
  minArea: undefined,
  maxArea: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  amenities: undefined,
  utilities: undefined,
};
const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.name = action.payload.name;
      state.categories = action.payload.categories;
      state.provinces = action.payload.provinces;
      state.districts = action.payload.districts;
      state.wards = action.payload.wards;
      state.minArea = action.payload.minArea;
      state.maxArea = action.payload.maxArea;
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
      state.amenities = action.payload.amenities;
      state.utilities = action.payload.utilities;
    },
  },
});

export default houseSlice.reducer;
export const { setFilter } = houseSlice.actions;
