import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { LOCAL_SAVED_MEMVER_ID } from "./ExternalBoot";
import { v1 } from "uuid";

export const adminLoggedInVar = makeVar(false);
export const userLoggedInVar = makeVar(false);
export const accessTokenVar = makeVar("");
export const refreshTokenVar = makeVar("");

if (process.browser) {
  const accessToken =
    sessionStorage.getItem("accessToken") ||
    localStorage.getItem("accessToken") ||
    "";
  accessTokenVar(accessToken);

  const refreshToken =
    sessionStorage.getItem("refreshToken") ||
    localStorage.getItem("refreshToken") ||
    "";
  refreshTokenVar(refreshToken);

  //채널톡 멤버아이디
  let memberId;
  let localSavedMemberId = window.localStorage.getItem(LOCAL_SAVED_MEMVER_ID);
  if (localSavedMemberId) {
    memberId = localSavedMemberId;
  } else {
    memberId = v1();
    window.localStorage.setItem(LOCAL_SAVED_MEMVER_ID, memberId);
  }
}

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

const wsLink: any = process.browser
  ? new GraphQLWsLink(
      createClient({
        url:
          process.env.NODE_ENV === "production"
            ? "wss://api.poketing.com/graphql"
            : `ws://localhost:4000/graphql`,
        connectionParams: {
          channelTalkMemberId: window.localStorage.getItem(
            LOCAL_SAVED_MEMVER_ID
          ),
        },
      })
    )
  : null;

const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      authLink.concat(httpLink)
    )
  : authLink.concat(httpLink);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
