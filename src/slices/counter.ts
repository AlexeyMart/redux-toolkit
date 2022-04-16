// Types
import { RootState } from "../store";

import { createSlice } from "@reduxjs/toolkit";

interface Counter {
  value: number;
}

const initialState: Counter = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value = state.value + 1;
    },
    decrement: (state) => {
      state.value = Math.max(state.value - 1, 0);
    },
  },
});

const { actions, reducer } = counterSlice;

export const { increment, decrement } = actions;

export const counterSelector = (state: RootState) => state.counter.value;

export default reducer;
