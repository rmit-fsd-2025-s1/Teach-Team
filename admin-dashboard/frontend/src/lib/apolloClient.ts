import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let apolloClient: ApolloClient<any> | null = null;

const GRAPHQL_HTTP_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL ?? "http://localhost:8001/graphql";

function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: GRAPHQL_HTTP_URL,
      credentials: "same-origin",
    }),
    cache: new InMemoryCache(),
  });
}
export function getApolloClient() {
  if (!apolloClient) {
    apolloClient = createApolloClient();
  }
  return apolloClient;
}
