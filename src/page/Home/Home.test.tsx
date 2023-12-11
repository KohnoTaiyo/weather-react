import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import * as Fetchers from "../../hooks/fetchers/fetchers";
import { mockForecastWeather } from "../../mock";
import Home from "./Home";

const user = userEvent.setup();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => jest.fn(),
}));

describe("App", () => {
  test("init renders correctly", () => {
    const { container } = render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Weather Forecast");
    expect(screen.getByRole("textbox")).toHaveValue("New York");
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("renders correctly fetch success", async () => {
    jest.spyOn(Fetchers, "getForecastWeather").mockResolvedValueOnce(mockForecastWeather);
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    await waitFor(() => {
      expect(screen.getByText(/Weather in New York, New York, United States of America at/i)).toBeInTheDocument();
      expect(screen.getByText(/5days weather/i)).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  test("not input show error text", async () => {
    render(<Home />);
    await user.clear(screen.getByRole("textbox"));
    await user.click(screen.getByRole("button", { name: /Search/i }));
    await waitFor(() => {
      screen.getByText(/Please enter a location/i);
    });
  });

  test("no data show error text", async () => {
    jest.spyOn(Fetchers, "getForecastWeather").mockImplementation(() => {
      throw new Error("The entered place name does not exist.");
    });
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    const textBox = screen.getByRole("textbox");
    await user.clear(textBox);
    await user.type(textBox, "undefined");
    await user.click(screen.getByRole("button", { name: /Search/i }));
    await waitFor(() => {
      screen.getByText(/The entered place name does not exist./i);
    });
  });
});
