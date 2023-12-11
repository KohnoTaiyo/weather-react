import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";

import * as Fetchers from "../../hooks/fetchers/fetchers";
import { mockForecastWeather } from "../../mock";
import Date from "./Date";

const mockUseLocationValue = {
  state: {
    location: "New York",
    date: "2023-12-01",
  },
};

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => mockUseLocationValue,
  useNavigate: () => mockedUsedNavigate,
}));

describe("App", () => {
  test("init renders correctly", () => {
    const { container } = render(<Date />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("New York at 12/01");
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("renders correctly fetch success", async () => {
    jest.spyOn(Fetchers, "getForecastWeather").mockResolvedValueOnce(mockForecastWeather);
    const { container } = render(<Date />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    await waitFor(() => {
      expect(screen.getByText(/Humidity:/i)).toBeInTheDocument();
      expect(screen.getByText(/Sunset:/i)).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  test("no data transition to the top", async () => {
    mockUseLocationValue.state.location = "";
    render(<Date />);
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
