import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Types
import { RootState } from "../store";
import { WritableDraft } from "immer/dist/internal";

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
    return rejectWithValue("Fetch posts error");
  }
});

export const deletePost = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("posts/deletePost", async (id, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error();
    }

    dispatch(removePost(id));
  } catch (error) {
    return rejectWithValue("Delete post error");
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

/** Начало запроса, установка состояния загрузки */
const setLoading = (state: WritableDraft<Posts>) => {
  state.error = null;
  state.status = "loading";
};

/** Установка состояния ошибки */
const setError = (state: WritableDraft<Posts>, message?: string) => {
  state.status = "error";

  if (message) {
    state.error = message;
  }
};

/** Установка успешного состояния */
const setSuccess = (state: WritableDraft<Posts>) => {
  state.status = "success";
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    removePost: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(({ id }) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, setLoading);

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      setSuccess(state);

      state.items = action.payload;
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      setError(state, action.payload);
    });

    builder.addCase(deletePost.pending, setLoading);

    builder.addCase(deletePost.fulfilled, setSuccess);

    builder.addCase(deletePost.rejected, (state, action) => {
      setError(state, action.payload);
    });
  },
});

export const postsSelector = (state: RootState) => ({
  items: state.posts.items,
  status: state.posts.status,
  error: state.posts.error,
});

const { reducer, actions } = postsSlice;

const { removePost } = actions;

export default reducer;
