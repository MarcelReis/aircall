import { MockedProvider, render, screen } from "../../test-utils";
import userEvents from "@testing-library/user-event";

import LoginPage from "../Login";
import { MockedResponse } from "@apollo/client/testing";
import { LoginDocument, LoginMutation } from "../../generated/graphql";

const usernameMock = "marcelreis";
const passwordMock = "123456";

const loginMutationMock: MockedResponse<LoginMutation> = {
  request: {
    query: LoginDocument,
    variables: { input: { username: usernameMock, password: passwordMock } },
  },
  result: {
    data: {
      login: {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYXJjZWxyZWlzIiwidXNlcm5hbWUiOiJtYXJjZWxyZWlzIiwiaWF0IjoxNjE5OTIzNjMzLCJleHAiOjE2MTk5MjQyMzN9.yYDcuMUJ94zvp07OUWrSpaDc2IKDiW5UbEImBBc9Q6k",
        user: {
          id: "marcelreis",
          username: "marcelreis",
          __typename: "UserType",
        },
        __typename: "AuthResponseType",
      },
    },
  },
};

describe("<LoginPage/>", function () {
  it("Should be able to login and redirect the user", async function () {
    render(
      <MockedProvider mocks={[loginMutationMock]}>
        <LoginPage />
      </MockedProvider>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });

    userEvents.click(loginButton);

    userEvents.type(usernameInput, usernameMock);
    userEvents.type(passwordInput, passwordMock);

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();

    userEvents.click(loginButton);

    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  });

  it("Should not permit invalid login attempts", async function () {
    render(
      <MockedProvider mocks={[loginMutationMock]}>
        <LoginPage />
      </MockedProvider>
    );
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });

    expect(loginButton).toBeEnabled();
    userEvents.click(loginButton);
    expect(loginButton).toBeDisabled();

    userEvents.type(usernameInput, usernameMock);
    userEvents.type(passwordInput, passwordMock);
    expect(loginButton).toBeEnabled();

    userEvents.clear(usernameInput);
    userEvents.clear(passwordInput);
    expect(loginButton).toBeDisabled();
  });
});
