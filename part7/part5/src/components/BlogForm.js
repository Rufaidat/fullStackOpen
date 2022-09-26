import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title: <input value={title} onChange={handleTitleChange} id="title" />
        <br />
        author:{" "}
        <input value={author} onChange={handleAuthorChange} id="author" />
        <br />
        url:
        <input value={url} onChange={handleUrlChange} id="url" />
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
