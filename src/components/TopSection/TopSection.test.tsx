import { render, screen } from "@testing-library/react";

import { TopSection, TopSectionProps } from "./TopSection";

const defaultMock: TopSectionProps = {
  title: "title",
  value: "value",
  onValueChange: jest.fn(),
  onSubmit: jest.fn(),
};

describe("TopSection", () => {
  test("renders correctly dom", () => {
    const { container: noErrorMessageComponent } = render(<TopSection {...defaultMock} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("title");
    expect(noErrorMessageComponent.querySelector(".error")).not.toBeInTheDocument();

    const { container: withErrorMessageComponent } = render(<TopSection {...defaultMock} errorMessage="error" />);
    expect(withErrorMessageComponent.querySelector(".error")).toBeInTheDocument();
  });

  test("snapshot", () => {
    const { container } = render(<TopSection {...defaultMock} errorMessage="error" />);
    expect(container).toMatchSnapshot();
  });
});
