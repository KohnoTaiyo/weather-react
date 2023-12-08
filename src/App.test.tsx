import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

const user = userEvent.setup();

describe("App", () => {
  test("input validation", async () => {
    render(<App />);
    const textBox = screen.getByRole("textbox");
    await user.clear(textBox);
    await user.click(screen.getByRole("button", { name: /Search/i }));
    await waitFor(() => {
      screen.getByText(/Please enter a location/i);
    });
  });

  test("renders correctly init", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  test("renders correctly rendered", async () => {
    render(<App />);
    await waitFor(() => {
      screen.getByText(/Weather in/i);
      screen.getByText(/5days weather/i);
    });
  });
});
