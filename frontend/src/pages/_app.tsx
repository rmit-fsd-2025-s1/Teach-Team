import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from "../context/AuthContext";
import { TutorApplicationProvider } from '../context/TutorApplicationContext';
import { UserProvider } from '../context/UserContext';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloClient';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <AuthProvider>
          <UserProvider>
            <TutorApplicationProvider>
              <Component {...pageProps} />
            </TutorApplicationProvider>
          </UserProvider>
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}
