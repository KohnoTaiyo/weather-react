import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { mockForecastWeather } from "../../mock";
import Home from "./Home";

describe("Home", () => {
  test("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <Home forecastWeather={mockForecastWeather} />
      </BrowserRouter>,
    );
    expect(screen.getByText(/Weather in New York, New York, United States of America at/i)).toBeInTheDocument();
    expect(screen.getByText(/5days weather/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
