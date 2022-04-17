import { configureStore } from "@reduxjs/toolkit";

// Slices
import counter from "../slices/counter";
import list from "../slices/list";
import posts from "../slices/posts";

const store = configureStore({
  reducer: {
    counter,
    list,
    posts,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
