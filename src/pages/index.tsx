import { Box, Flex, Text, Button, Grid } from "@chakra-ui/react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header>
        <Button bgGradient="linear(to-r, blue.500, teal.300)" onClick={handleClick}>Get Started</Button>
      </Header>
      <Flex flex="1" alignItems="center" justifyContent="center" bg="gray.800" px={4}>
        <Box textAlign="center" maxWidth="800px" py={8}>
          <Text
            fontSize={{ base: "3xl", md: "7xl" }}
            fontWeight="bold"
            color="white"
            mb={4}
          >
            Welcome to{" "}
            <Text as="span" bgGradient="linear(to-r, teal.300, blue.500)" bgClip="text">
              TeachTeam
            </Text>
          </Text>
          <Text
            fontSize={{ base: "lg", md: "3xl" }}
            fontWeight="semibold"
            color="gray.300"
            mb={6}
          >
            A seamless platform connecting tutors and lecturers
          </Text>
          <Text fontSize={{ base: "md", md: "xl" }} color="gray.300" mb={8}>
            Whether you're a tutor seeking opportunities or a lecturer looking
            for the best talent, we have you covered.
          </Text>
          <Button
            bgGradient="linear(to-r, blue.500, teal.300)"
            size="lg"
            px="2.5rem"
            py="2rem"
            fontSize="2xl"
            onClick={handleClick}
            _hover={{ bgGradient: "linear(to-r, teal.300, blue.500)" }}
            transition="all 0.3s ease"
          >
            Get Started
          </Button>
        </Box>
      </Flex>
      <Box bg="gray.800" color="white" py={10} px={8}>
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={8}          
          maxWidth="1200px"
          mx="auto"
        >
          
          <Box
            bg="gray.700"
            p={8}             
            borderRadius="md"
            boxShadow="md"
          >
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              For Tutors
            </Text>
            <Text mb={3}>
              <strong>Apply</strong> for tutor and lab-assistant roles for the
              current semester.
            </Text>
            <Text mb={3}>
              <strong>Showcase</strong> your previous roles, availability (part
              or full time), and core skills.
            </Text>
            <Text mb={3}>
              <strong>Highlight</strong> your academic credentials to stand out
              from the crowd.
            </Text>
          </Box>

          
          <Box
            bg="gray.700"
            p={8}            
            borderRadius="md"
            boxShadow="md"
          >
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              For Lecturers
            </Text>
            <Text mb={3}>
              <strong>View</strong> a list of applicants and filter them by
              course, availability, and skills.
            </Text>
            <Text mb={3}>
              <strong>Select &amp; Rank</strong> the best candidates and
              maintain a streamlined hiring process.
            </Text>
            <Text mb={3}>
              <strong>Comment</strong> on tutor profiles to keep track of
              strengths and preferences.
            </Text>
          </Box>
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
}
