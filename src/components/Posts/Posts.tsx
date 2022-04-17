import { FC, useEffect } from "react";

// Hooks
import { useAppDispatch, useAppSelector } from "../../hooks";

// Styles
import "./Posts.css";

// Actions, Selectors
import { postsSelector, fetchPosts } from "../../slices/posts";

// Types
import { Post } from "../../slices/posts";

const Posts: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const { items, status, error } = useAppSelector(postsSelector);

  const renderItem = ({ id, title, body }: Post) => {
    return (
      <div className="post" key={id}>
        <div className="post-title">{title}</div>

        <div className="post-body">{body}</div>
      </div>
    );
  };

  return (
    <div className="posts">
      <h3>Posts, status: {status}</h3>

      {error && <div>{error}</div>}

      {items.map(renderItem)}
    </div>
  );
};

export default Posts;
