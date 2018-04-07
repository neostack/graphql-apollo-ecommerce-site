import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, split } from "apollo-link";
import localStateResolvers from "./local-state/resolvers";
import localStateDefaults from "./local-state/defaults";
import { withClientState } from "apollo-link-state";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const wsClient = new SubscriptionClient("ws://localhost:8000/subscriptions", {
  reconnect: true
});

// Create a WebSocket link:
const wsLink = new WebSocketLink(wsClient);

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers: localStateResolvers,
  defaults: localStateDefaults
});

function logLink(operation, forward) {
  console.log("log query", operation.query);
  const obs = forward(operation);
  if (isSubscriptionQuery({ query: operation.query })) {
    return obs;
  }
  return obs.map(data => {
    console.log("log data", data);
    return data;
  });
}

function isSubscriptionQuery({ query }) {
  const { kind, operation } = getMainDefinition(query);
  return kind === "OperationDefinition" && operation === "subscription";
}

const networkLink = split(
  // split based on operation type
  isSubscriptionQuery,
  wsLink,
  new HttpLink()
);

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([logLink, stateLink, networkLink])
});

export default client;
