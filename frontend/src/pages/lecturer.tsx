import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../components/header";
import Footer from "../components/footer";
import { useTutorApplication } from "../context/TutorApplicationContext";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import { ApplicationSearch } from "../components/lecturer/ApplicationSearch";
import { ApplicationTable } from "../components/lecturer/ApplicationTable";
import { ApplicationDetailsModal } from "../components/lecturer/ApplicationDetailsModal";
import { Application } from "../types/application";
import { User } from "../types/User";
import { getCourseName } from "../utils/courseUtils";
import ApplicationVisualsModal from "../components/lecturer/ApplicationVisualsModal";

export default function LecturerPage() {
  const router = useRouter();
  const toast = useToast();

  const { updateApplication, deleteApplication } = useTutorApplication();
  const {logout, user} = useAuth();
  const {updateUser, getUserByEmail, getUsers} = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"course" | "availability" | "name" | "skills">("availability");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");


  const [applications, setApplications] = useState<Application[]>([]); // State to store fetched applications
  
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isVisualsModalOpen, setIsVisualsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [newComment, setNewComment] = useState("");

  const [visualsData, setVisualsData] = useState({
    mostChosenUsers: [] as User[],
    leastChosenUsers: [] as User[],
    notSelectedUsers: [] as User[],
  }); 
  useEffect(() => {
    if (!user) {
      router.push("/login");
      toast({
        title: "Unauthorized",
        description: "Please log in to access this page.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [user]);
 
  

  const fetchApplications = async () => {
    try {
      const params = new URLSearchParams({
        search: searchQuery,
        sortBy,
        order: sortDirection,
        lecturerId: user?.id || "",
      } as any).toString();

      const { data } = await axios.get<Application[]>(
        `/api/lecturer/applications?${params}`,
        { withCredentials: true }
      );
      setApplications(data);
    } catch {
      toast({ title: "Failed to load applications", status: "error", duration: 3000 });
    }
  };

  useEffect(() => {
    fetchApplications()
  }, [searchQuery, sortBy, sortDirection])

const sortedApplications = [...applications].sort((a, b) => {
    let cmp = 0;
    switch (sortBy) {
      case "course":
        cmp = (getCourseName(a.selectedCourse) || "").localeCompare(getCourseName(b.selectedCourse) || "");
        break;
      case "availability":
        cmp = a.availability.localeCompare(b.availability);
        break;
      case "name":
        cmp = a.name.localeCompare(b.name);
        break;
      case "skills":
        cmp = a.skills.localeCompare(b.skills);
        break;
    }
    return sortDirection === "asc" ? cmp : -cmp;
  });


  const handleColumnSort = (column: "course" | "availability") => { //sorting course or availability
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const handleRankChange = (id: string, rank: string | number) => { //ranking applicants
    updateApplication(id, { rank });
  };

  const handleViewDetails = (application: Application) => { //view details button
    setSelectedApplication(application);
    setNewComment(application.comments || "");
    setIsDetailsModalOpen(true);
    setIsVisualsModalOpen(false);
  };

  const handleSaveComment = () => { //adding comments for an applicant
    if (selectedApplication) {
      updateApplication(selectedApplication.id, {
        ...selectedApplication,
        comments: newComment,
        availability: selectedApplication.availability as
          | "part-time"
          | "full-time",
      });

      toast({
        title: "Comment saved.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setIsDetailsModalOpen(false);
    }
  };

  const handleSelect = async (application: Application) => { //select button implementation
    const user = getUserByEmail(application.email)
    if(!user) return;

    try {
      if(!application.isSelected) {
        await updateUser(application.email, {selectionCount: user.selectionCount + 1})
        await updateApplication(application.id, {isSelected: true})
        toast({
          title: "Selected",
          status: "success",
          duration: 3000,
          isClosable: true
        })
      } else {
        await updateUser(application.email, {selectionCount: user.selectionCount - 1})
        await updateApplication(application.id, {isSelected: false})
        toast({
          title: "Unselected",
          status: "success",
          duration: 3000,
          isClosable: true
        })
      }

      await fetchApplications()
    } catch (error) {
      toast({
        title: "Error updating application",
        status: "error",
        duration: 5000,
        isClosable: true
      })
    }
  };
  

  const handleViewVisuals = () => { // grpah implementation
    const users = getUsers();
  
    // Find max and min (non-zero) selection counts
    const maxCount = Math.max(...users.map((u) => u.selectionCount));
    const minCount = Math.min(
      ...users.filter((u) => u.selectionCount > 0).map((u) => u.selectionCount)
    );
  
    // Find all users with max and min selectionCount
    const mostChosenUsers = users.filter(
      (u) => u.selectionCount === maxCount && !u.isLecturer
    );
  
    const leastChosenUsers = users.filter(
      (u) => u.selectionCount === minCount && !u.isLecturer
    );
  
    const notSelectedUsers: User[] = users.filter(
      (user) => user.selectionCount === 0 && user.isLecturer === false
    );
  
    setIsVisualsModalOpen(true);
    setIsDetailsModalOpen(false);
    setVisualsData({
      mostChosenUsers,
      leastChosenUsers,
      notSelectedUsers,
    });
  };  

  const handleDeleteApplication = () => { //deleting an application
    if (selectedApplication) {
      deleteApplication(selectedApplication.id); 
      setIsDetailsModalOpen(false);  
      toast({
        title: "Application Deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  

  return ( //page layout
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />
      <Flex flex="1" justifyContent="center" alignItems="center" bg="gray.800">
        <Box
          bg="gray.700"
          p={8}
          borderRadius="md"
          width="90%"
          maxWidth="1200px"
        >
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <Text fontSize="2xl" fontWeight="bold" color="teal.300">
              Submitted Applications
            </Text>
            
            <Button size="sm" bgGradient="linear(to-r, blue.500, teal.300)" _hover={{bgGradient: "linear(to-r, blue.300, teal.500)"}} onClick={handleViewVisuals}>
              View Visuals
            </Button>
          </Flex>

          <ApplicationSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={(col) => handleColumnSort(col as any)}
          />

          <ApplicationTable
            applications={sortedApplications}
            onSelect={handleSelect}
            onRankChange={handleRankChange}
            onViewDetails={handleViewDetails}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleColumnSort}
            getUserByEmail={getUserByEmail}
          />
        </Box>
      </Flex>

      <ApplicationVisualsModal
        isOpen={isVisualsModalOpen}
        onClose={() => setIsVisualsModalOpen(false)}
        notSelectedUsers={visualsData.notSelectedUsers}
        mostChosenUsers={visualsData.mostChosenUsers}
        leastChosenUsers={visualsData.leastChosenUsers}
      />

      <ApplicationDetailsModal
        application={selectedApplication}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        comment={newComment}
        setComment={setNewComment}
        onSave={handleSaveComment}
        onDelete={handleDeleteApplication}

      />

      <Footer />
    </Box>
  );
}
