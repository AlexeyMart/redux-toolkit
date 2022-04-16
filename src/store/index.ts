import { configureStore } from "@reduxjs/toolkit";

// Slices
import counter from "../slices/counter";
import list from "../slices/list";

const store = configureStore({
  reducer: {
    counter,
    list,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
