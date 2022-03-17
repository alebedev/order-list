import React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";

import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import userEvent from "@testing-library/user-event";

function getLoadingIndicator() {
  return screen.getByText(/loading/i);
}

test("Load and navigate order list", async () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getLoadingIndicator()).toBeInTheDocument();

  // Check orders on first page
  await waitForElementToBeRemoved(() => getLoadingIndicator());
  expect(screen.getAllByTestId("order").length).toBe(5);

  // Now select second page
  const user = userEvent.setup();
  await user.click(
    within(screen.getByTestId("orderListControls")).getByRole("button", {
      name: "2",
    })
  );
  expect(getLoadingIndicator()).toBeInTheDocument();

  await waitForElementToBeRemoved(() => getLoadingIndicator());
  expect(screen.getAllByTestId("order").length).toBe(1);
});
