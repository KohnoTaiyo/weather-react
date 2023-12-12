import { render, screen } from "@testing-library/react";

import { mockForecastWeather } from "../../mock";
import Date from "./Date";

describe("Date", () => {
  test("renders correctly", () => {
    const { container } = render(<Date forecastWeather={mockForecastWeather} />);
    expect(screen.getByText(/Humidity:/i)).toBeInTheDocument();
    expect(screen.getByText(/Sunset:/i)).toBeInTheDocument();
    expect(screen.getByText(/00:00/i)).toBeInTheDocument();
    expect(screen.getByText(/23:00/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
