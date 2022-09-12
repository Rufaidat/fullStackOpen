import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog/>", () => {
  const blog = {
    title: "check if only title and author is rendered by default",
    author: "tester",
    url: "the url",
    likes: 0,
    user: {
      name: "tester",
    },
  };
  let container;

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container;
  });

  test("renders the blog's title and author by default and not url and likes", () => {
    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent(
      "check if only title and author is rendered by default",
      "tester"
    );
    expect(div).not.toHaveTextContent("the url", 0);
  });

  test("after clicking the view button, likes and url is displayed ", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const div = container.querySelector(".detailContent");
    expect(div).toBeDefined();
  });

  test("the like button is clicked ", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(blog.likes).toEqual(2);
  });
});
