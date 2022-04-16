import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { RootState } from "../store";

interface List {
  items: string[];
}

const initialState: List = {
  items: ["drink", "sleep", "play"],
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      const { payload } = action;

      state.items.push(payload);
    },

    remove: (state, action: PayloadAction<string>) => {
      const { payload } = action;

      state.items = state.items.filter((item) => item !== payload);
    },
  },
});

const { actions, reducer } = listSlice;

export const { add, remove } = actions;

export const listSelector = (state: RootState) => state.list.items;

export default reducer;
