import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { RootState } from "../store";

export const fetchPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>("posts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return rejectWithValue("Server error");
  }
});

export interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}

interface Posts {
  items: Post[];
  status: null | "loading" | "error" | "success";
  error: null | string;
}

const initialState: Posts = {
  items: [],
  status: null,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.error = null;
      state.status = "loading";
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "success";
      state.items = action.payload;
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "error";

      if (action.payload) {
        state.error = action.payload;
      }
    });
  },
});

export const postsSelector = (state: RootState) => ({
  items: state.posts.items,
  status: state.posts.status,
  error: state.posts.error,
});

const { reducer } = postsSlice;

export default reducer;
