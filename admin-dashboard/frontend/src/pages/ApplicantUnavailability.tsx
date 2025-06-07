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
  IconButton,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import Layout from "../components/admin/Layout";

interface Applicant {
  id: string;
  name: string;
  email: string;
  selectedCourse: string;
}

export default function ApplicantUnavailabilityPage() {
  // Placeholder for loading state
  const loading = false;
  // Placeholder for error state
  const error = null as { message: string } | null;
  // Placeholder for data
  const applicants: Applicant[] = [];

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
                      <IconButton
                        aria-label="Edit Availability"
                        icon={<EditIcon />}
                        size="sm"
                        onClick={() => {}}
                      />
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
