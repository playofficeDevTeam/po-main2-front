import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar,
} from "@apollo/client";

export const adminLoggedInVar = makeVar(false);
export const userLoggedInVar = makeVar(false);
export const accessTokenVar = makeVar("");
export const refreshTokenVar = makeVar("");

try {
  const accessToken =
    sessionStorage.getItem("accessToken") ||
    localStorage.getItem("accessToken") ||
    "";
  const refreshToken =
    sessionStorage.getItem("refreshToken") ||
    localStorage.getItem("refreshToken") ||
    "";
  accessTokenVar(accessToken);
  refreshTokenVar(refreshToken);
} catch (error) {}

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_HOST + "/graphql",
});
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: "Bearer " + (accessTokenVar() || ""),
    },
  };
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
