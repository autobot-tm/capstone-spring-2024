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
  metadata: undefined,
  page: 1,
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
    setInitialState: state => {
      state.name = undefined;
      state.categories = undefined;
      state.provinces = undefined;
      state.districts = undefined;
      state.wards = undefined;
      state.minArea = undefined;
      state.maxArea = undefined;
      state.minPrice = undefined;
      state.maxPrice = undefined;
      state.amenities = undefined;
      state.utilities = undefined;
    },
    setMetaData: (state, action) => {
      state.metadata = action.payload.metadata;
    },
    setPage: (state, action) => {
      state.page = action.payload.page;
    },
  },
});

export default houseSlice.reducer;
export const { setFilter, setInitialState, setMetaData, setPage } = houseSlice.actions;
