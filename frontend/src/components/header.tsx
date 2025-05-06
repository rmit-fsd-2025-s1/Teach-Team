import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode; 
}

const Header = ({children}: HeaderProps) => {
  return (
    <header className="header">
      <Box>     
        <Box bg="gray.700" color="white" py={4}>
          <Flex justify="space-between" align="center" px={8}>
            <Text fontSize="2xl" fontWeight="bold" color={"teal.300"}>
              <Link _hover={{ textDecoration: "none" }} href="/">
              TeachTeam
              </Link>
            </Text>
            {children}
          </Flex>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
