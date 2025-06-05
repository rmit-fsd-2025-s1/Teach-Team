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
  Button,
  useToast,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import Layout from "../components/admin/Layout";


const GET_ALL_TUTORS = gql`
  query GetAllTutors {
    adminAllTutors {
      id
      name
      email
      isBlocked
    }
  }
`;


const BLOCK_TUTOR = gql`
  mutation BlockTutor($tutorId: ID!) {
    adminBlockTutor(tutorId: $tutorId) {
      id
      isBlocked
    }
  }
`;

const UNBLOCK_TUTOR = gql`
  mutation UnblockTutor($tutorId: ID!) {
    adminUnblockTutor(tutorId: $tutorId) {
      id
      isBlocked
    }
  }
`;

export default function blockLoginPage() {
  const toast = useToast();

  
  const {
    data: tutorsData,
    loading: tutorsLoading,
    error: tutorsError,
    refetch: refetchTutors,
  } = useQuery(GET_ALL_TUTORS);

 
  const [blockTutor, { loading: blocking }] = useMutation(BLOCK_TUTOR, {
    onCompleted: () => {
      toast({
        title: "Tutor blocked",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetchTutors();
    },
    onError: (mutationError) => {
      toast({
        title: "Error blocking tutor",
        description: mutationError.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });


  const [unblockTutor, { loading: unblocking }] = useMutation(UNBLOCK_TUTOR, {
    onCompleted: () => {
      toast({
        title: "Tutor unblocked",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetchTutors();
    },
    onError: (mutationError) => {
      toast({
        title: "Error unblocking tutor",
        description: mutationError.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });


  const handleBlockClick = (tutorId: string) => {
      blockTutor({ variables: { tutorId } });
    
  };

  const handleUnblockClick = (tutorId: string) => {
      unblockTutor({ variables: { tutorId } });
    
  };


  if (tutorsLoading) {
    return (
      <Layout>
        <Center h="100%">
          <Spinner size="xl" />
        </Center>
      </Layout>
    );
  }

  if (tutorsError) {
    return (
      <Layout>
        <Alert status="error">
          <AlertIcon />
          Error loading tutors: {tutorsError.message}
        </Alert>
      </Layout>
    );
  }

 
  const tutors: Array<{
    id: string;
    name: string;
    email: string;
    isBlocked: boolean;
  }> = tutorsData?.adminAllTutors || [];

  return (
    <Layout>
      <Box>
        <Heading as="h2" size="xl" mb={4} color="white">
          Manage Tutors Accounts
        </Heading>
        <Text mb={6} color="white">
          Block or unblock tutor logins as needed.
        </Text>

        {tutors.length === 0 ? (
          <Text color="white">No tutor accounts found.</Text>
        ) : (
          <Table variant="simple" color="white" bg="gray.700" borderRadius="md">
            <Thead>
              <Tr>
                <Th color="white">Name</Th>
                <Th color="white">Email</Th>
                <Th color="white">Status</Th>
                <Th color="white">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tutors.map((tutor) => (
                <Tr key={tutor.id}>
                  <Td>{tutor.name}</Td>
                  <Td>{tutor.email}</Td>
                  <Td>{tutor.isBlocked ? "Blocked" : "Active"}</Td>
                  <Td>
                    <HStack spacing={2}>
                      {tutor.isBlocked ? (
                        <Button
                          size="sm"
                          colorScheme="green"
                          leftIcon={<UnlockIcon />}
                          onClick={() => handleUnblockClick(tutor.id)}
                          isLoading={unblocking}
                        >
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          colorScheme="red"
                          leftIcon={<LockIcon />}
                          onClick={() => handleBlockClick(tutor.id)}
                          isLoading={blocking}
                        >
                          Block
                        </Button>
                      )}
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
