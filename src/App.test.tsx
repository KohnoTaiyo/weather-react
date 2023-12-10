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

  test("renders correctly", async () => {
    const { container } = render(<App />);
    // 初期表示
    expect(screen.getByText(/Weather Forecast/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    // 検索後表示
    await waitFor(() => {
      expect(screen.getByText(/Weather in/i)).toBeInTheDocument();
      expect(screen.getByText(/5days weather/i)).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });
});
