import { render } from "@testing-library/react";

import { TextBox } from "./TextBox";

test("renders correctly", async () => {
  const { container } = render(<TextBox value="value" onChange={() => {}} />);
  expect(container).toMatchSnapshot();
});
