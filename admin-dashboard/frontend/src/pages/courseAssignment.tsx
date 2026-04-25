import { useState, useEffect, type ChangeEvent } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  Box,
  Heading,
  Text,
  Select,
  FormControl,
  FormLabel,
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import Layout from "../components/admin/Layout";

const GET_ALL_LECTURERS = gql`
  query GetAllLecturers {
    adminAllLecturers {
      id
      name
      email
    }
  }
`;

const GET_ALL_COURSES = gql`
  query GetAllCourses($semester: String) {
    adminAllCourses(semester: $semester) {
      courseCode
      courseName
      semester
    }
  }
`;

const GET_LECTURER_ASSIGNMENTS = gql`
  query GetLecturerAssignments($lecturerId: ID!) {
    adminLecturerAssignments(lecturerId: $lecturerId) {
      id
      lecturer {
        id
        name
      }
      course {
        courseCode
        courseName
        semester
      }
    }
  }
`;

const ASSIGN_LECTURER_COURSE = gql`
  mutation AssignLecturerCourse($lecturerId: ID!, $courseCode: String!) {
    adminAssignLecturerCourse(
      lecturerId: $lecturerId
      courseCode: $courseCode
    ) {
      id
      lecturer {
        id
        name
      }
      course {
        courseCode
        courseName
        semester
      }
    }
  }
`;

const REMOVE_LECTURER_COURSE = gql`
  mutation RemoveLecturerCourse($lecturerId: ID!, $courseCode: String!) {
    adminRemoveLecturerCourse(lecturerId: $lecturerId, courseCode: $courseCode)
  }
`;

export default function AssignmentsPage() {
  const toast = useToast();

  const [selectedLecturerId, setSelectedLecturerId] = useState<string>("");
  const [selectedLecturerName, setSelectedLecturerName] = useState<string>("");

  const {
    isOpen: isAssignOpen,
    onOpen: onAssignOpen,
    onClose: onAssignClose,
  } = useDisclosure();

  const [assignCourseCode, setAssignCourseCode] = useState<string>("");

  const {
    data: lecturersData,
    loading: lecturersLoading,
    error: lecturersError,
  } = useQuery(GET_ALL_LECTURERS);

  const {
    data: coursesData,
    loading: coursesLoading,
    error: coursesError,
  } = useQuery(GET_ALL_COURSES, {
    variables: { semester: null },
  });

  const {
    data: assignmentsData,
    loading: assignmentsLoading,
    error: assignmentsError,
    refetch: refetchAssignments,
  } = useQuery(GET_LECTURER_ASSIGNMENTS, {
    variables: { lecturerId: selectedLecturerId },
    skip: !selectedLecturerId,
  });

  const [assignLecturerCourse, { loading: assigning }] = useMutation(
    ASSIGN_LECTURER_COURSE,
    {
      onCompleted: () => {
        toast({
          title: "Course assigned to lecturer",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onAssignClose();
        setAssignCourseCode("");
        refetchAssignments();
      },
      onError: (mutationError) => {
        toast({
          title: "Error assigning course",
          description: mutationError.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const [removeLecturerCourse, { loading: removing }] = useMutation(
    REMOVE_LECTURER_COURSE,
    {
      onCompleted: () => {
        toast({
          title: "Course unassigned from lecturer",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        refetchAssignments();
      },
      onError: (mutationError) => {
        toast({
          title: "Error unassigning course",
          description: mutationError.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const handleLecturerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedLecturerId(id);

    const lecturer = lecturersData?.adminAllLecturers.find(
      (lec: any) => String(lec.id) === id
    );
    setSelectedLecturerName(lecturer?.name || "");
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignCourseCode || !selectedLecturerId) {
      toast({
        title: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    assignLecturerCourse({
      variables: {
        lecturerId: Number(selectedLecturerId),
        courseCode: assignCourseCode,
      },
    });
  };

  const handleUnassignClick = (courseCodeToRemove: string) => {
    if (selectedLecturerId) {
      removeLecturerCourse({
        variables: {
          lecturerId: Number(selectedLecturerId),
          courseCode: courseCodeToRemove,
        },
      });
    }
  };

  if (lecturersLoading || coursesLoading) {
    return (
      <Layout>
        <Center h="100%">
          <Spinner size="xl" color="white" />
        </Center>
      </Layout>
    );
  }

  if (lecturersError) {
    return (
      <Layout>
        <Alert status="error">
          <AlertIcon />
          Error loading lecturers: {lecturersError.message}
        </Alert>
      </Layout>
    );
  }

  if (coursesError) {
    return (
      <Layout>
        <Alert status="error">
          <AlertIcon />
          Error loading courses: {coursesError.message}
        </Alert>
      </Layout>
    );
  }

  const lecturers: Array<{
    id: number;
    name: string;
    email: string;
  }> = lecturersData?.adminAllLecturers || [];

  const courses: Array<{
    courseCode: string;
    courseName: string;
    semester: string;
  }> = coursesData?.adminAllCourses || [];

  const assignments: Array<{
    id: string;
    lecturer: { id: number; name: string };
    course: { courseCode: string; courseName: string; semester: string };
  }> = assignmentsData?.adminLecturerAssignments || [];

  return (
    <Layout>
      <Box>
        <Heading as="h2" size="xl" mb={4} color="white">
          Lecturer to Course Assignment
        </Heading>
        <Text mb={6} color="white">
          Select a lecturer to view and manage their course assignments.
        </Text>

        <FormControl w="300px" mb={6}>
          <FormLabel color="white">Choose a Lecturer</FormLabel>
          <Select
            placeholder="Select lecturer..."
            value={selectedLecturerId}
            onChange={handleLecturerChange}
            bg="white"
            color="black"
          >
            {lecturers.map((lec) => (
              <option key={lec.id} value={String(lec.id)}>
                {lec.name} ({lec.email.split("@")[0]})
              </option>
            ))}
          </Select>
        </FormControl>

        {!selectedLecturerId ? null : assignmentsLoading ? (
          <Center h="100px">
            <Spinner size="lg" color="white" />
          </Center>
        ) : assignmentsError ? (
          <Alert status="error">
            <AlertIcon />
            Error loading assignments: {assignmentsError.message}
          </Alert>
        ) : (
          <>
            <Button colorScheme="teal" mb={4} onClick={onAssignOpen}>
              Assign New Course
            </Button>

            {assignments.length === 0 ? (
              <Text color="white">
                No courses assigned to this lecturer yet.
              </Text>
            ) : (
              <Table
                variant="simple"
                bg="gray.700"
                color="white"
                borderRadius="md"
              >
                <Thead>
                  <Tr>
                    <Th color="white">Course Code</Th>
                    <Th color="white">Course Name</Th>
                    <Th color="white">Semester</Th>
                    <Th color="white">Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {assignments.map((a) => (
                    <Tr key={a.id}>
                      <Td>{a.course.courseCode}</Td>
                      <Td>{a.course.courseName}</Td>
                      <Td>{a.course.semester}</Td>
                      <Td>
                        <IconButton
                          aria-label="Remove Assignment"
                          icon={<DeleteIcon />}
                          size="sm"
                          colorScheme="red"
                          onClick={() =>
                            handleUnassignClick(a.course.courseCode)
                          }
                          isLoading={removing}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </>
        )}

        <Modal isOpen={isAssignOpen} onClose={onAssignClose} isCentered>
          <ModalOverlay />
          <ModalContent bg="gray.800">
            <ModalHeader color="white">
              Assign Course to {selectedLecturerName}
            </ModalHeader>
            <ModalCloseButton color="white" />
            <form onSubmit={handleAssignSubmit}>
              <ModalBody>
                <VStack spacing={4} align="stretch">
                  <FormControl id="assignCourseCode" isRequired>
                    <FormLabel color="white">Select Course</FormLabel>
                    <Select
                      placeholder="Choose a course..."
                      value={assignCourseCode}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        setAssignCourseCode(e.target.value)
                      }
                      bg="gray.700"
                      color="black"
                    >
                      {courses.map((c) => (
                        <option
                          key={`${c.courseCode}-${c.semester}`}
                          value={c.courseCode}
                        >
                          {c.courseCode} — {c.courseName} ({c.semester})
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onAssignClose} colorScheme="red" mr={3}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="teal" isLoading={assigning}>
                  Assign
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Box>
    </Layout>
  );
}
