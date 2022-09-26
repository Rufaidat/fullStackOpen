import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm createBlog={createBlog} />);

  const title = container.querySelector("#title");
  const author = container.querySelector("#author");
  const url = container.querySelector("#url");
  const createButton = screen.getByText("create");

  await user.type(title, "testing a form...");
  await user.type(author, "tester");
  await user.type(url, "tester.com");
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);

  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");
  expect(createBlog.mock.calls[0][0].author).toBe("tester");
  expect(createBlog.mock.calls[0][0].url).toBe("tester.com");
});
