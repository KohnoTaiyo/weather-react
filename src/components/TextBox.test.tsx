import { render, screen } from "@testing-library/react";

import { TextBox } from "./TextBox";

const onChangeMock = jest.fn();

describe("TextBox", () => {
  test("renders correctly dom", () => {
    render(<TextBox value="value" onChange={onChangeMock} />);
    expect(screen.getByRole("textbox")).toBeTruthy();
    expect(screen.getByRole("button", { name: /Search/i })).toBeTruthy();
  });

  test("renders correctly", () => {
    const { container } = render(<TextBox value="value" onChange={onChangeMock} />);
    expect(container).toMatchSnapshot();
  });
});
