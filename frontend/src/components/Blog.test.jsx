import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders title and author but not url and likes initially ", async () => {
  const blog = {
    title: "Blog title test",
    author: "Sean Brookstein",
    url: "blogging.com",
    likes: 10,
  };

  const { container } = render(<Blog blog={blog} />);

  const title = container.querySelector(".title");
  const author = container.querySelector(".author");
  const url = container.querySelector(".blog-url");
  const likes = container.querySelector(".blog-likes");

  expect(title).toHaveTextContent("Blog title test");
  expect(author).toHaveTextContent("Sean Brookstein");
  expect(url).toBe(null);
  expect(likes).toBe(null);
});

test("clicking view shows url and likes ", async () => {
  const blog = {
    title: "Blog title test",
    author: "Sean Brookstein",
    url: "blogging.com",
    likes: 10,
    user: {
      name: "Mike Meyers",
    },
  };

  console.log(userEvent);
  const mockHandler = vi.fn();

  render(<Blog blog={blog} onClick={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");

  await user.click(button);

  const url = screen.getByTestId("url");
  const likes = screen.getByTestId("likes");

  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});

test("clicking twice calls function twice ", async () => {
  const blog = {
    title: "Blog title test",
    author: "Sean Brookstein",
    url: "blogging.com",
    likes: 10,
    user: {
      name: "Mike Meyers",
    },
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} handleExpand={mockHandler} />);

  const user = userEvent.setup();
  let button = screen.getByTestId("view");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
