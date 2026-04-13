import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import healthReducer from "./healthSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    health: healthReducer,
  },
  devTools: true,
});

export default store;