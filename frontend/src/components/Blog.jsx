import { useState } from "react";

import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs }) => {
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
    return;
  };

  const blogDetails = () => (
    <>
      <br />
      <a data-testid="url" href={blog.url}>
        {blog.url}
      </a>
      <p data-testid="likes">
        Likes {likes}
        <button onClick={handleLike}>Like</button>
      </p>
      <p>{blog.user.name}</p>
      <button onClick={() => handleDelete(blog.id)}>Delete</button>
    </>
  );

  return (
    <div style={blogStyle}>
      <p className="title">
        {blog.title} <strong className="author"> - {blog.author}</strong>
      </p>
      <button onClick={handleExpand} data-testid="view">
        {expanded ? "hide" : "view"}
      </button>
      {expanded && blogDetails()}
    </div>
  );
};

export default Blog;
