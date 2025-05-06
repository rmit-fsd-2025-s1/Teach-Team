import Footer from "../components/footer";
import Header from "../components/header";
import { useRouter } from "next/router";
import { Box, Button, Center, Text } from "@chakra-ui/react";

const ApplicationSubmitted = () => {
  const router = useRouter();
  const handleSubmitAnother = () => {
    router.push("/tutor");
  };

  return (
    <div>
      <Header>{""}</Header>
      <Center height="84vh" flexDirection="column" bg="gray.800">
        <Box textAlign="center" color="white">
        <Box mb={4}>
          <img 
            src="/check_circle.svg" 
            alt="Application Submitted" 
            style={{
              width: '200px', 
              height: '200px', 
              display: 'block',
              margin: '0 auto',
              filter: 'invert(50%) sepia(84%) saturate(500%) hue-rotate(100deg) brightness(90%) contrast(85%)',
            }} 
          />
        </Box>
          <Text fontSize="5xl" fontWeight="bold" color={"teal.300"} mb={4}>
            Application Submitted
          </Text>
          <Text fontSize="lg" mb={8}>
            Your application has been successfully submitted. Thank you for
            applying!
          </Text>
          <Button size="lg" bgGradient="linear(to-r, teal.300, blue.500)" _hover={{bgGradient: "linear(to-r, teal.500, blue.300)"}} onClick={handleSubmitAnother}>
            Submit Another Application
          </Button>
        </Box>
      </Center>
      <Footer />
    </div>
  );
};

export default ApplicationSubmitted;
