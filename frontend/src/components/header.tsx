import { Box, Flex, Text, Link, Button } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <Box bg="gray.700" color="white" py={4}>
      <Flex justify="space-between" align="center" px={8}>
      <Text fontSize="2xl" fontWeight="bold" color={"teal.300"}>
              <Link _hover={{ textDecoration: "none" }} href="/">
              TeachTeam
              </Link>
        </Text>

        {user ? (
          <Flex align="center">
            <Text mr={4}>Welcome, {user.name}</Text>
            <Button size="md" colorScheme="red" onClick={logout}>
              Logout
            </Button>
          </Flex>
        ) : (
          <Flex>
            <Link href="/login" mr={4}>
              Log in
            </Link>
            <Link href="/signup">Sign up</Link>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
