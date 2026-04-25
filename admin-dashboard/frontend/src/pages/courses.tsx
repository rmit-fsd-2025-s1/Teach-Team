import { useState, type ChangeEvent } from "react";
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useToast,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Layout from "../components/admin/Layout";

const GET_COURSES = gql`
  query GetAllCourses($semester: String) {
    adminAllCourses(semester: $semester) {
      courseCode
      courseName
      semester
    }
  }
`;


const CREATE_COURSE = gql`
  mutation CreateCourse($courseCode: String!, $courseName: String!, $semester: String!) {
    adminCreateCourse(courseCode: $courseCode, courseName: $courseName, semester: $semester) {
      courseCode
      courseName
      semester
    }
  }
`;


const UPDATE_COURSE = gql`
  mutation UpdateCourse($courseCode: String!, $courseName: String!, $semester: String!) {
    adminUpdateCourse(courseCode: $courseCode, courseName: $courseName, semester: $semester) {
      courseCode
      courseName
      semester
    }
  }
`;

const DELETE_COURSE = gql`
  mutation DeleteCourse($courseCode: String!) {
    adminDeleteCourse(courseCode: $courseCode)
  }
`;

export default function CoursesPage() {
  const toast = useToast();
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const [newCourseCode, setNewCourseCode] = useState("");
  const [newCourseName, setNewCourseName] = useState("");
  const [newSemester, setNewSemester] = useState("");


  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [editCourseCode, setEditCourseCode] = useState("");
  const [editCourseName, setEditCourseName] = useState("");
  const [editSemester, setEditSemester] = useState("");

  
  const { data, loading, error, refetch } = useQuery(GET_COURSES, {
    variables: { semester: null },
    fetchPolicy: "network-only",
  });


  const [createCourse, { loading: creating }] = useMutation(CREATE_COURSE, {
    onCompleted: () => {
      toast({
        title: "Course created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onAddClose();
      setNewCourseCode("");
      setNewCourseName("");
      setNewSemester("");
      refetch();
    },
    onError: (mutationError) => {
      toast({
        title: "Error creating course",
        description: mutationError.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });


  const [updateCourse, { loading: updating }] = useMutation(UPDATE_COURSE, {
    onCompleted: () => {
      toast({
        title: "Course updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onEditClose();
      setEditCourseCode("");
      setEditCourseName("");
      setEditSemester("");
      refetch();
    },
    onError: (mutationError) => {
      toast({
        title: "Error updating course",
        description: mutationError.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

 
  const [deleteCourse, { loading: deleting }] = useMutation(DELETE_COURSE, {
    onCompleted: () => {
      toast({
        title: "Course deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refetch();
    },
    onError: (mutationError) => {
      toast({
        title: "Error deleting course",
        description: mutationError.message,
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
          Error loading courses: {error.message}
        </Alert>
      </Layout>
    );
  }

  const courses: Array<{ courseCode: string; courseName: string; semester: string }> =
    data?.adminAllCourses || [];


  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseCode.trim() || !newCourseName.trim() || !newSemester.trim()) {
      toast({
        title: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    createCourse({
      variables: {
        courseCode: newCourseCode.trim(),
        courseName: newCourseName.trim(),
        semester: newSemester.trim(),
      },
    });
  };


  const handleEditClick = (course: { courseCode: string; courseName: string; semester: string }) => {
    setEditCourseCode(course.courseCode);
    setEditCourseName(course.courseName);
    setEditSemester(course.semester);
    onEditOpen();
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCourseCode || !editCourseName.trim() || !editSemester.trim()) {
      toast({
        title: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    updateCourse({
      variables: {
        courseCode: editCourseCode,           
        courseName: editCourseName.trim(),
        semester: editSemester.trim(),
      },
    });
  };


  const handleDeleteClick = (courseCodeToDelete: string) => {
      deleteCourse({
        variables: { courseCode: courseCodeToDelete },
      });
  };


  return (
    <Layout>
      <Box>
        <Heading as="h2" size="xl" mb={4} color="white">
          Manage Courses
        </Heading>
        <Text mb={6} color="white">
          Below is the list of courses. You can add, edit, or delete them.
        </Text>

        <Button colorScheme="teal" mb={4} onClick={onAddOpen}>
          Add New Course
        </Button>

        {courses.length === 0 ? (
          <Text color="white">No courses found.</Text>
        ) : (
          <Table variant="simple" color="white" bg="gray.700" borderRadius="md">
            <Thead>
              <Tr>
                <Th color="white">Course Code</Th>
                <Th color="white">Course Name</Th>
                <Th color="white">Semester</Th>
                <Th color="white">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map((course) => (
                <Tr key={course.courseCode + course.semester}>
                  <Td>{course.courseCode}</Td>
                  <Td>{course.courseName}</Td>
                  <Td>{course.semester}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        aria-label="Edit Course"
                        icon={<EditIcon />}
                        size="sm"
                        onClick={() => handleEditClick(course)}
                      />
                      <IconButton
                        aria-label="Delete Course"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDeleteClick(course.courseCode)}
                        isLoading={deleting}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

       
        <Modal isOpen={isAddOpen} onClose={onAddClose} isCentered>
          <ModalOverlay />
          <ModalContent bg="gray.800">
            <ModalHeader color="white">Add New Course</ModalHeader>
            <ModalCloseButton color="white" />
            <form onSubmit={handleCreate}>
              <ModalBody>
                <VStack spacing={4} align="stretch">
                  <FormControl id="newCourseCode" isRequired>
                    <FormLabel color="white">Course Code</FormLabel>
                    <Input
                      type="text"
                      value={newCourseCode}
                      placeholder="e.g. COSC2302"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setNewCourseCode(e.target.value)
                      }
                      bg="gray.700"
                      color="white"
                      _placeholder={{ color: "gray.400" }}
                    />
                  </FormControl>
                  <FormControl id="newCourseName" isRequired>
                    <FormLabel color="white">Course Name</FormLabel>
                    <Input
                      type="text"
                      value={newCourseName}
                      placeholder="e.g. Full Stack Development"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setNewCourseName(e.target.value)
                      }
                      bg="gray.700"
                      color="white"
                      _placeholder={{ color: "gray.400" }}
                    />
                  </FormControl>
                  <FormControl id="newSemester" isRequired>
                    <FormLabel color="white">Semester</FormLabel>
                    <Input
                      type="text"
                      value={newSemester}
                      placeholder="e.g. 2025S1"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setNewSemester(e.target.value)
                      }
                      bg="gray.700"
                      color="white"
                      _placeholder={{ color: "gray.400" }}
                    />
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onAddClose} colorScheme="red" mr={3}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="teal" isLoading={creating}>
                  Create
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>

  
        <Modal isOpen={isEditOpen} onClose={onEditClose} isCentered>
          <ModalOverlay />
          <ModalContent bg="gray.800">
            <ModalHeader color="white">Edit Course</ModalHeader>
            <ModalCloseButton color="white" />
            <form onSubmit={handleUpdate}>
              <ModalBody>
                <VStack spacing={4} align="stretch">
                  <FormControl id="editCourseCode" isReadOnly>
                    <FormLabel color="white">Course Code</FormLabel>
                    <Input
                      type="text"
                      value={editCourseCode}
                      bg="gray.700"
                      color="gray.400"
                      readOnly
                    />
                  </FormControl>
                  <FormControl id="editCourseName" isRequired>
                    <FormLabel color="white">Course Name</FormLabel>
                    <Input
                      type="text"
                      value={editCourseName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEditCourseName(e.target.value)
                      }
                      bg="gray.700"
                      color="white"
                      _placeholder={{ color: "gray.400" }}
                    />
                  </FormControl>
                  <FormControl id="editSemester" isRequired>
                    <FormLabel color="white">Semester</FormLabel>
                    <Input
                      type="text"
                      value={editSemester}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEditSemester(e.target.value)
                      }
                      bg="gray.700"
                      color="white"
                      _placeholder={{ color: "gray.400" }}
                    />
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onEditClose} colorScheme="red" mr={3}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue" isLoading={updating}>
                  Save Changes
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Box>
    </Layout>
  );
}
