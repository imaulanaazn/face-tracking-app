import { configureStore } from "@reduxjs/toolkit";
import merchantReducer from "./slices/merchantSlice";

const store = configureStore({
  reducer: {
    merchant: merchantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
