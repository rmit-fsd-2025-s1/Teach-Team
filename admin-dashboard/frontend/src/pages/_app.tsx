import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { getApolloClient } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = getApolloClient();
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <Component {...pageProps} />;
      </ChakraProvider>
    </ApolloProvider>
  );
}
