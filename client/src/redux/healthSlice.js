import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  predictions: [],
  reports: [],
  loading: false,
  error: null,
};

const healthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {
    // 🔹 Prediction
    predictionStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    predictionSuccess: (state, action) => {
      state.loading = false;
      state.predictions.push(action.payload);
    },

    predictionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // 🔹 Reports
    setReports: (state, action) => {
      state.reports = action.payload;
    },

    addReport: (state, action) => {
      state.reports.unshift(action.payload);
    },

    clearHealthData: (state) => {
      state.predictions = [];
      state.reports = [];
    },
  },
});

export const {
  predictionStart,
  predictionSuccess,
  predictionFailure,
  setReports,
  addReport,
  clearHealthData,
} = healthSlice.actions;

export default healthSlice.reducer;