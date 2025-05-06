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
  const {login} = useAuth();
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const success = login(email, password);
    if (success) {
      let user = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")!) : null;
      console.log(user)
      if(user.isAdmin == false) {
      router.push("/tutor");
      toast({
        title: "Successfully logged in",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      } else if(user.isAdmin == true) {
        router.push("/lecturer");
        toast({
          title: "Successfully logged in",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "User not found",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {  
      toast({
        title: "Invalid Email or Password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header>{""}</Header>

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
                Don't have an account?
                <Link fontWeight={"bold"} href="/signup" color={"teal.300"}> Create one</Link>
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
