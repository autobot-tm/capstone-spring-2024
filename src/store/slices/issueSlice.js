import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'ALL',
  category: 'ALL',
  page: 1,
  loading: false,
};

const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    setIssueStatus: (state, action) => {
      state.status = action.payload.status;
    },
    setIssueCategory: (state, action) => {
      state.category = action.payload.category;
    },
    setIssuePage: (state, action) => {
      state.page = action.payload.page;
    },

    setIssueLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
  },
});

export default issueSlice.reducer;
export const { setIssueStatus, setIssueCategory, setIssuePage, setIssueLoading } = issueSlice.actions;
