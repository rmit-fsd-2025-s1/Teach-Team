import { Flex, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <Flex
      as="header"
      bg="gray.900"
      color="white"
      px={6}
      py={4}
      align="center"
      justify="space-between"
    >
      <Text fontSize="xl" fontWeight="bold">
        TeamTeam - Admin Dashboard
      </Text>
      <Button size="sm" colorScheme="red" color="white" onClick={handleLogout}>
        Logout
      </Button>
    </Flex>
  );
}
