import { useState } from "react";
import {
  Flex,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim() == "admin" && password.trim() == "admin") {
      toast({
        title: "Successfully logged in",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/courses");
    } else {
      toast({
        title: "Invalid username or password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="gray.800"
      align="center"
      justify="center"
    >
      <Box
        bg="gray.900"
        p={8}
        rounded="md"
        shadow="md"
        w="100%"
        maxW="400px"
      >
        <Heading as="h2" color="white" size="lg" mb={6} textAlign="center">
          Admin Login
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl id="username" isRequired>
              <FormLabel color="white">Username</FormLabel>
              <Input
                type="text"
                value={username}
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                bg="gray.700"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel color="white">Password</FormLabel>
              <Input
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                bg="gray.700"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>

            <Button type="submit" colorScheme="teal" w="full">
              Log In
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
