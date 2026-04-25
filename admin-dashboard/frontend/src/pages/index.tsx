import { useState, type ChangeEvent } from "react";
import { gql, useMutation } from "@apollo/client";
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

const LOGIN_ADMIN = gql`
  mutation LoginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password)
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [login, { loading }] = useMutation(LOGIN_ADMIN, {
    onCompleted: (data) => {
      toast({
        title: "Successfully logged in",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push('/courses');
    },
    onError: (error) => {
      toast({
        title: "Error logging in",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });


 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ variables: { email, password } });
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
              <FormLabel color="white">Email</FormLabel>
              <Input
                type="text"
                value={email}
                placeholder="Enter username"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
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
