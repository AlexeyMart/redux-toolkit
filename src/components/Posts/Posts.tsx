import { FC, useEffect } from "react";
import cn from "classnames";

// Hooks
import { useAppDispatch, useAppSelector } from "../../hooks";

// Styles
import "./Posts.css";

// Actions, Selectors
import { postsSelector, fetchPosts, deletePost } from "../../slices/posts";

// Types
import { Post } from "../../slices/posts";

const Posts: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const { items, status, error } = useAppSelector(postsSelector);

  const renderItem = ({ id, title, body }: Post) => {
    const handleRemove = () => dispatch(deletePost(id));

    return (
      <div className="post" key={id}>
        <div className="post-title">{title}</div>

        <div className="post-body">{body}</div>

        <button onClick={handleRemove}>Remove</button>
      </div>
    );
  };

  const cnStatus = cn({
    "posts-status-error": status === "error",
    "posts-status-success": status === "success",
    "posts-status-loading": status === "loading",
  });

  return (
    <div className="posts">
      <h3 className={cnStatus}>
        <span>Status: {status}</span>

        {error && <span>{error}</span>}
      </h3>

      {items.map(renderItem)}
    </div>
  );
};

export default Posts;
