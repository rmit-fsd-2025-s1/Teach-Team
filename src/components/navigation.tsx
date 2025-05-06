import { Box, Button, VStack, Link } from "@chakra-ui/react";

const Navigation = () => {

    return (
        <Box bg="blue.50" color="black" width="250px" minHeight="" p={4}>
          <VStack spacing={6} align="flex-start">
            <Link href="#" color="white" _hover={{ textDecoration: "none" }}>
              <Button variant="link" color="black" fontSize="lg">
                Home
              </Button>
            </Link>
            <Link href="#">
              <Button variant="link" color="black" fontSize="lg">
                Sign-Up
              </Button>
            </Link>
            <Link href="#">
              <Button variant="link" color="black" fontSize="lg">
                Sign-In
              </Button>
            </Link>
            <Link href="#">
              <Button variant="link" color="black" fontSize="lg">
                Sign-Out
              </Button>
            </Link>
          </VStack>
        </Box>
    )

}

export default Navigation;