// Types
import { RootState } from "../store";

export const counterSelector = (state: RootState) => state.counter.value;

export const listSelector = (state: RootState) => state.list.items;
