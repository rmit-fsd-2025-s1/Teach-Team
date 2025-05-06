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
            Signup
          </Text>

          <form>
          <FormControl mb={4}>
              <FormLabel htmlFor="name" color={"teal.300"}>Full Name</FormLabel>
              <Input id="name" type="text" color={"white"} placeholder="Enter your full name" required/>
          </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="email" color={"teal.300"}>Email</FormLabel>
              <Input id="email" type="email" color={"white"} placeholder="Enter your email" required/>
            </FormControl>

            <FormControl mb={6}>
              <FormLabel htmlFor="password" color={"teal.300"}>Password</FormLabel>
              <Input
              color={"white"}
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </FormControl>

            <Button bgGradient="linear(to-r, blue.500, teal.300)" width="100%" type="submit" _hover={{ bgGradient: "linear(to-r, teal.500, blue.300)" }}>
              Sign up
            </Button>
          </form>
        </Box>
      </Flex>

      <Footer />
    </Box>
  );
}
