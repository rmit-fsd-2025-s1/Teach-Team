import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Text, Flex, Button, useToast } from "@chakra-ui/react";
import Header from "../components/header";
import Footer from "../components/footer";
import { TutorApplication } from "../types/application";
import { useTutorApplication } from "../context/TutorApplicationContext";
import { useAuth } from "../context/AuthContext";
import { FormField } from "../components/tutor/FormField";
import { CourseSelect } from "../components/tutor/CourseSelect";
import { RoleSelect } from "../components/tutor/RoleSelect";
import { AvailabilityRadio } from "../components/tutor/AvailabilityRadio";

function TutorApplicationForm() {
  const router = useRouter();
  const toast = useToast();
  const { addApplication } = useTutorApplication();
  const { user } = useAuth();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
      toast({
        title: "Unauthorized",
        description: "Please log in to access this page.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      })
    }
  }, []);

  const [formData, setFormData] = useState<TutorApplication>({
    id: "",
    name: user?.name || "",
    email: user?.email || "",
    selectedCourse: "",
    role: "",
    previousRoles: "",
    availability: "part-time",
    skills: "",
    academicCredentials: "",
    dateApplied: "",
    isSelected: false,
  });

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvailabilityChange = (value: "part-time" | "full-time") => {
    setFormData({ ...formData, availability: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if ( //error handling incomplete form
      !formData.selectedCourse ||
      !formData.academicCredentials ||
      !formData.skills
    ) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const numberRegex = /\d/;

    if (numberRegex.test(formData.skills)) {
      toast({
        title: "Invalid Skills",
        description: "Skills cannot contain numbers.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (numberRegex.test(formData.academicCredentials)) {
      toast({
        title: "Invalid Academic Credentials",
        description: "Academic credentials cannot contain numbers.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (formData.previousRoles && numberRegex.test(formData.previousRoles)) {
      toast({
        title: "Invalid Previous Roles",
        description: "Previous roles cannot contain numbers.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const newApplication: TutorApplication = {
      ...formData,
      id: Date.now().toString(),
      dateApplied: new Date().toISOString(),
      isSelected: false,
    };

    addApplication(newApplication);

    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully!",
      status: "success",
      duration: 5000, 
      isClosable: true,
    });

    router.push("/submitted");
  };

  return (
    <Box bg="gray.700" p={8} borderRadius="md" width="500px" maxWidth="90%" my={8}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold" color="teal.300">
          Tutor Application
        </Text>
      </Flex>

      <form onSubmit={handleSubmit}>
        <FormField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          isReadOnly
          isDisabled
        />

        <FormField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="email"
          isReadOnly
          isDisabled
        />

        <CourseSelect
          value={formData.selectedCourse}
          onChange={handleInputChange}
        />

        <RoleSelect
          value={formData.role}
          onChange={handleInputChange}
        />

        <AvailabilityRadio
          value={formData.availability}
          onChange={handleAvailabilityChange}
        />

        <FormField
          label="Previous Roles"
          name="previousRoles"
          value={formData.previousRoles}
          onChange={handleInputChange}
        />

        <FormField
          label="Skills (comma-separated)"
          name="skills"
          value={formData.skills}
          onChange={handleInputChange}
        />

        <FormField
          label="Academic Credentials"
          name="academicCredentials"
          value={formData.academicCredentials}
          onChange={handleInputChange}
        />

        <Button bgGradient="linear(to-r, blue.500, teal.300)" _hover={{ bgGradient:"linear(to-r, blue.300, teal.500)"}} width="100%" type="submit">
          Submit Application
        </Button>
      </form>
    </Box>
  );
}

export default function TutorsPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    router.push("/login");
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header>
      </Header>
      <Flex flex="1" justifyContent="center" alignItems="center" bg="gray.800">
        <TutorApplicationForm />
      </Flex>
      <Footer />
    </Box>
  );
}
