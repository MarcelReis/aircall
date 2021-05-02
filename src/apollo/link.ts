import { createHttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { LoginMutation } from "../generated/graphql";
import { logout } from "./auth";

const httpLink = createHttpLink({
  uri: "https://frontend-test-api.aircall.io/graphql",
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  const auth = JSON.parse(localStorage.getItem("login")!) as
    | LoginMutation["login"]
    | null;

  return {
    headers: {
      ...headers,
      authorization: auth ? `Bearer ${auth.access_token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors }) => {
  const isTokenExpired =
    graphQLErrors &&
    graphQLErrors.some((error) => error.message === "Unauthorized");

  if (isTokenExpired) {
    logout();
  }
});

export const link = authLink.concat(errorLink).concat(httpLink);
