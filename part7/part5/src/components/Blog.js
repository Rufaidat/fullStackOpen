import { useState } from "react";

const Blog = ({ blog, handleLike, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const button = {
    margin: 5,
    borderRadius: 5,
    border: "1rem",
    padding: 5,
  };

  const [visible, setVisible] = useState(false);
  const brief = () => (
    <div className="briefContent">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(true)} style={button} className="view">
        view
      </button>
    </div>
  );

  const increaseLike = (event) => {
    event.preventDefault();
    handleLike({ ...blog, likes: blog.likes + 1 });
    console.log({ ...blog, likes: blog.likes + 1 });
  };

  const removeBlog = (event) => {
    event.preventDefault();

    handleRemove(blog);
  };

  const details = () => (
    <div className="detailContent">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(false)} style={button}>
        hide
      </button>
      <p>{blog.url}</p>
      like {blog.likes}{" "}
      <button style={button} onClick={increaseLike}>
        like
      </button>
      <p>{blog.user.name}</p>
      <button onClick={removeBlog}>remove</button>
    </div>
  );

  return (
    <div style={blogStyle} className="blog">
      {!visible === true ? brief() : details()}
    </div>
  );
};

export default Blog;
