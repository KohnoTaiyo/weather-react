import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

import App from "./App";
import * as Fetchers from "./hooks/fetchers/fetchers";
import { mockForecastWeather } from "./mock";

const mockUseLocationValue = {
  state: {
    location: "New York",
    date: "",
  },
};
const user = userEvent.setup();
const mockedUsedNavigate = jest.fn();
const mockResolveResponse = () => jest.spyOn(Fetchers, "getForecastWeather").mockResolvedValueOnce(mockForecastWeather);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => mockUseLocationValue,
  useNavigate: () => mockedUsedNavigate,
}));

describe("App", () => {
  test("init renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Weather Forecast");
    expect(screen.getByRole("textbox")).toHaveValue("New York");
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  describe("error", () => {
    test("empty submit show error message", async () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );
      await user.clear(screen.getByRole("textbox"));
      await user.click(screen.getByRole("button", { name: /Search/i }));
      await waitFor(() => {
        screen.getByText(/Please enter a location/i);
      });
    });

    test("no matching location show error message", async () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );
      const textbox = screen.getByRole("textbox");
      await user.clear(textbox);
      await user.type(textbox, "undefined");
      await user.click(screen.getByRole("button", { name: /Search/i }));
      await waitFor(() => {
        screen.getByText(/The entered place name does not exist./i);
      });
    });

    test("no data show error message", async () => {
      jest.spyOn(Fetchers, "getForecastWeather").mockImplementation(() => {
        throw new Error("The entered place name does not exist.");
      });
      render(
        <BrowserRouter>
          <App />
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

  describe("Home", () => {
    test("fetch success home", async () => {
      mockResolveResponse();
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );
      await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
      await waitFor(() => {
        expect(screen.getByText(/Weather in New York, New York, United States of America at/i)).toBeInTheDocument();
        expect(screen.getByText(/5days weather/i)).toBeInTheDocument();
      });
    });
  });

  describe("Date", () => {
    test("no date state transition to the top", async () => {
      render(
        <MemoryRouter initialEntries={["/NewYork"]}>
          <App />
        </MemoryRouter>,
      );
      await waitFor(() => {
        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
      });
    });

    test("fetch success date", async () => {
      mockResolveResponse();
      mockUseLocationValue.state.date = "2023-12-01";
      render(
        <MemoryRouter initialEntries={["/NewYork"]}>
          <App />
        </MemoryRouter>,
      );
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("New York at 12/01");
      await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
      await waitFor(() => {
        expect(screen.getByText(/Humidity:/i)).toBeInTheDocument();
        expect(screen.getByText(/Sunset:/i)).toBeInTheDocument();
      });
    });
  });
});
