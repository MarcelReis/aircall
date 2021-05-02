import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { authVar } from "./auth";

const httpLink = createHttpLink({
  uri: "https://frontend-test-api.aircall.io/graphql",
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  const token = authVar();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.access_token}` : "",
    },
  };
});

export const link = authLink.concat(httpLink);
