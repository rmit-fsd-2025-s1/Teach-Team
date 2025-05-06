import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from "../context/AuthContext";
import { TutorApplicationProvider } from '../context/TutorApplicationContext';
import { UserProvider } from '../context/UserContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <UserProvider>
          <TutorApplicationProvider>
            <Component {...pageProps} />
          </TutorApplicationProvider>
        </UserProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}
