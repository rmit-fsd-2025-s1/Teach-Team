import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let apolloClient: ApolloClient<any> | null = null;

function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:8001/graphql",
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
