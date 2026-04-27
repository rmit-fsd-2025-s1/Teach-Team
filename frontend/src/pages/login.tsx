import Footer from "../components/footer";
import {
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  useToast
} from "@chakra-ui/react";
import { useState, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Header from "../components/header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, user} = useAuth();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const loginUser = await login(email, password);
    console.log(loginUser)

    if(loginUser?.isBlocked === true) {
      toast({ 
        title: "Your account is blocked",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return
    }

    if (loginUser) {
      router.push("/" + (loginUser?.isLecturer ? "lecturer" : "tutor"));
    } else {
      toast({
        title: "Invalid email or password",
        status: "error",
        duration: 3000,
      });
    }
  };
  
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header/>

      <Flex flex="1" justifyContent="center" alignItems="center" bg={"gray.800"}>
        <Box
          bg="gray.700"
          p={8}
          borderRadius="md"
          width="500px"
          maxWidth="90%"
          height="450px"
        >
          <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center" color={"teal.300"}>
            Login
          </Text>

          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel htmlFor="email" color={"teal.300"}>Email</FormLabel>
              <Input id="email" type="email" color={"white"} placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </FormControl>

            <FormControl mb={6}>
              <FormLabel htmlFor="password" color={"teal.300"}>Password</FormLabel>
              <Input
              color={"white"}
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Text pt={4} color={"white"}>
                Don't have an account?{" "}
                <Link fontWeight={"bold"} href="/signup" color={"teal.300"}>
                  Create one
                </Link>{" "}
                or visit the{" "}
                <Link
                  fontWeight={"bold"}
                  href="https://github.com/um4rzzz/Teach-Team"
                  color={"teal.300"}
                  isExternal
                >
                  GitHub Repo
                </Link>{" "}
                for login data.
              </Text>
            </FormControl>

            <Button bgGradient="linear(to-r, teal.300, blue.500)" width="100%" type="submit" _hover={{ bgGradient: "linear(to-r, teal.500, blue.300)" }}>
              Log In
            </Button>
          </form>
        </Box>
      </Flex>

      <Footer />
    </Box>
  );
}
