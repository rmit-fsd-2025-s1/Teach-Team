import { ReactNode } from "react";
import { Flex, Box } from "@chakra-ui/react";
import Header from "../header";
import NavBar from "./NavBar";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex flex="1">
        <NavBar />

        
        <Box flex="1" bg="gray.800" p={6}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
