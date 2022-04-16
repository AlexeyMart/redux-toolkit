// Types
import { RootState } from "../store";

export const counterSelector = (state: RootState) => state.counter.value;
