import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  CaseReducer,
  Draft,
} from "@reduxjs/toolkit";

// Types
import { RootState } from "../store";

export const fetchPosts = createAsyncThunk<void, void, { rejectValue: string }>(
  "posts/fetchPosts",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=10"
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      dispatch(setItems(data));
    } catch (error) {
      return rejectWithValue("Fetch posts error");
    }
  }
);

export const deletePost = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("posts/deletePost", async (id, { dispatch, rejectWithValue }) => {
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

/** Начало запроса, установка состояния загрузки */
const setLoading = (state: Draft<Posts>) => {
  state.error = null;
  state.status = "loading";
};

/** Установка состояния ошибки */
const setError = (state: Draft<Posts>, message?: string) => {
  state.status = "error";

  if (message) {
    state.error = message;
  }
};

/** Установка успешного состояния */
const setSuccess = (state: Draft<Posts>) => {
  state.status = "success";
};

/** Удаление поста */
const handleRemovePost: CaseReducer<Posts, PayloadAction<string>> = (
  state,
  action
) => {
  const { payload } = action;

  state.items = state.items.filter(({ id }) => id !== payload);
};

/** Установка списка */
const handleSetItems: CaseReducer<Posts, PayloadAction<Post[]>> = (
  state,
  action
) => {
  const { payload } = action;

  state.items = payload;
};

const initialState: Posts = {
  items: [],
  status: null,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    removePost: handleRemovePost,
    setItems: handleSetItems,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, setLoading);

    builder.addCase(fetchPosts.fulfilled, setSuccess);

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

const { removePost, setItems } = actions;

export default reducer;

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
