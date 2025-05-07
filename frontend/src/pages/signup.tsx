import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import Footer from "../components/footer";
import Header from "../components/header";
import {
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";


export default function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLecturer, setIsLecturer] = useState("false");
  const toast = useToast();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      //TODO: ISLECTURER SHOULD HAVE AN INPUT FIELD
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
        isLecturer: "true",
    });

    toast({
      title: "Account created successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    router.push("/login");
    } catch(error: any) {
    toast({
      title: "Error creating account",
      description: error.response.data.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    })
  }

}
  
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
            Signup
          </Text>

          <form>
          <FormControl mb={4}>
              <FormLabel htmlFor="name" color={"teal.300"}>Full Name</FormLabel>
              <Input id="name" type="text" color={"white"} placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required/>
          </FormControl>
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
            </FormControl>

            <Button onClick={onSubmit} bgGradient="linear(to-r, blue.500, teal.300)" width="100%" type="submit" _hover={{ bgGradient: "linear(to-r, teal.500, blue.300)" }}>
              Sign up
            </Button>
          </form>
        </Box>
      </Flex>

      <Footer />
    </Box>
  );
}
