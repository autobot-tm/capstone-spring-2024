import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    houses: [],
    clickedStatus: {},
  },
  reducers: {
    addToWishlist: (state, action) => {
      const { house } = action.payload;
      state.houses = [...state.houses, house];
      state.clickedStatus[house.id] = true;
    },
    removeFromWishlist: (state, action) => {
      const { id } = action.payload;
      state.houses = state.houses.filter(house => house.id !== id);
      delete state.clickedStatus[id];
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
