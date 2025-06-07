import { useQuery, useMutation, gql } from "@apollo/client";
import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  HStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import Layout from "../components/admin/Layout";

const GET_APPLICATIONS = gql`
  query GetAllApplications {
    adminAllApplications {
      id
      name
      email
      selectedCourse
      role
      previousRoles
      availability
      skills
      academicCredentials
      isUnavailable
    }
  }
`;

const SET_UNAVAILABLE = gql`
  mutation SetApplicantUnavailable($applicationId: ID!) {
    setApplicantUnavailable(applicationId: $applicationId) {
      id
      isUnavailable
    }
  }
`;

const SET_AVAILABLE = gql`
  mutation SetApplicantAvailable($applicationId: ID!) {
    setApplicantAvailable(applicationId: $applicationId) {
      id
      isUnavailable
    }
  }
`;

interface Applicant {
  id: string;
  name: string;
  email: string;
  selectedCourse: string;
  role: string;
  previousRoles: string;
  availability: string;
  skills: string;
  academicCredentials: string;
  isUnavailable: boolean;
}

export default function ApplicantUnavailabilityPage() {
  const toast = useToast();
  const { data, loading, error, refetch } = useQuery(GET_APPLICATIONS);

  const [setUnavailable] = useMutation(SET_UNAVAILABLE, {
    onCompleted: () => {
      toast({
        title: "Applicant marked as unavailable",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error marking applicant as unavailable",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const [setAvailable] = useMutation(SET_AVAILABLE, {
    onCompleted: () => {
      toast({
        title: "Applicant marked as available",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error marking applicant as available",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  if (loading) {
    return (
      <Layout>
        <Center h="100%">
          <Spinner size="xl" color="white"/>
        </Center>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Alert status="error">
          <AlertIcon />
          Error loading applicants: {error.message}
        </Alert>
      </Layout>
    );
  }

  const applicants: Applicant[] = data?.adminAllApplications || [];

  const handleToggleAvailability = (applicationId: string, currentStatus: boolean) => {
    if (currentStatus) {
      setAvailable({ variables: { applicationId } });
    } else {
      setUnavailable({ variables: { applicationId } });
    }
  };

  return (
    <Layout>
      <Box>
        <Heading as="h2" size="xl" mb={4} color="white">
          Applicant Unavailability
        </Heading>
        <Text mb={6} color="white">
          Manage applicant availability status for tutoring assignments.
        </Text>

        {applicants.length === 0 ? (
          <Text color="white">No applicants found.</Text>
        ) : (
          <Table variant="simple" color="white" bg="gray.700" borderRadius="md">
            <Thead>
              <Tr>
                <Th color="white">Name</Th>
                <Th color="white">Course</Th>
                <Th color="white">Email</Th>
                <Th color="white">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {applicants.map((applicant) => (
                <Tr key={applicant.id}>
                  <Td>{applicant.name}</Td>
                  <Td>{applicant.selectedCourse}</Td>
                  <Td>{applicant.email}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button
                        colorScheme={applicant.isUnavailable ? "green" : "purple"}
                        size="sm"
                        onClick={() => handleToggleAvailability(applicant.id, applicant.isUnavailable)}
                      >
                        {applicant.isUnavailable ? "Make Available" : "Make Unavailable"}
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Layout>
  );
}
