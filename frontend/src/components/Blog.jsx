import { useState } from "react";

import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, user }) => {
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleExpand = () => {
    setExpanded((prevState) => !prevState);
  };

  const handleLike = () => {
    blogService.update(blog.id);
    setLikes((prev) => prev + 1);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(id);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      return;
    }
  };

  const blogDetails = () => (
    <>
      <br />
      <a data-testid="url" href={blog.url}>
        {blog.url}
      </a>
      <p data-testid="likes">
        Likes {likes}
        <button id="like-button" onClick={handleLike}>
          Like
        </button>
      </p>
      <p>{blog.user.name}</p>

      {user?.id === blog.user.id && (
        <button id="delete-button" onClick={() => handleDelete(blog.id)}>
          Delete
        </button>
      )}
    </>
  );

  return (
    <div style={blogStyle} className="blog">
      <p className="title">
        {blog.title} <strong className="author"> - {blog.author}</strong>
      </p>
      <button id="view-button" onClick={handleExpand} data-testid="view">
        {expanded ? "hide" : "view"}
      </button>
      {expanded && blogDetails()}
    </div>
  );
};

export default Blog;
