import { configureStore } from "@reduxjs/toolkit";

// Reducers
import counter from "../reducers/counter";

const store = configureStore({
  reducer: {
    counter,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
