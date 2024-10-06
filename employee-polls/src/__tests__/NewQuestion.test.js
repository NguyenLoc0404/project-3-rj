import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import NewQuestion from "../components/NewQuestion";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";
import rootReducer from "../reducers";
import { handleAddQuestion } from "../actions/questions";

const store = createStore(rootReducer);
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("../actions/questions", () => ({
  handleAddQuestion: jest.fn(() => ({
    type: "ADD_QUESTION",
    payload: {
      id: "mock-id",
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "mock-author",
    },
  })),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
})); 

test("NewQuestion component snapshot", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter> {/*  Wrap NewQuestion component in MemoryRouter */}
        <NewQuestion />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

test("fireEvent test for NewQuestion", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NewQuestion />
      </MemoryRouter>
    </Provider>
  );

  const optionOneInput = screen.getByPlaceholderText("Enter Option One Text Here");
  const optionTwoInput = screen.getByPlaceholderText("Enter Option Two Text Here");
  const submitButton = screen.getByText("Submit");

  expect(submitButton).toBeDisabled();

  fireEvent.change(optionOneInput, { target: { value: "Option One" } });
  fireEvent.change(optionTwoInput, { target: { value: "Option Two" } });

  expect(submitButton).not.toBeDisabled();

  fireEvent.click(submitButton);
  expect(mockDispatch).toHaveBeenCalledWith(handleAddQuestion("Option One", "Option Two"));
});


test("initial state of form fields", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NewQuestion />
      </MemoryRouter>
    </Provider>
  );

  const optionOneInput = screen.getByPlaceholderText("Enter Option One Text Here");
  const optionTwoInput = screen.getByPlaceholderText("Enter Option Two Text Here");

  expect(optionOneInput.value).toBe("");
  expect(optionTwoInput.value).toBe("");
});

test("should reset input fields after successful submission", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NewQuestion />
      </MemoryRouter>
    </Provider>
  );

  const optionOneInput = screen.getByPlaceholderText("Enter Option One Text Here");
  const optionTwoInput = screen.getByPlaceholderText("Enter Option Two Text Here");
  const submitButton = screen.getByText("Submit");

  fireEvent.change(optionOneInput, { target: { value: "Option One" } });
  fireEvent.change(optionTwoInput, { target: { value: "Option Two" } });

  fireEvent.click(submitButton);

  expect(optionOneInput.value).toBe("Option One");
  expect(optionTwoInput.value).toBe("Option Two");
});


test("renders all elements correctly", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NewQuestion />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByPlaceholderText("Enter Option One Text Here")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Enter Option Two Text Here")).toBeInTheDocument();
  expect(screen.getByText("Submit")).toBeInTheDocument();
});

test("should not dispatch action if input is invalid", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NewQuestion />
      </MemoryRouter>
    </Provider>
  );

  const submitButton = screen.getByText("Submit");

  fireEvent.click(submitButton);
  expect(mockDispatch).not.toHaveBeenCalled();
});