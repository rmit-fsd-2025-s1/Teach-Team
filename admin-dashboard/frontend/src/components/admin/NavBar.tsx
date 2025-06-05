import { Box, VStack, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  return (
    <Box
      bg="gray.700"
      w="250px"
      h="100vh"
      borderRight="1px solid"
      borderColor="gray.700"
      p={4}
    >
      <VStack spacing={4} align="flex-start" color={"white"}>
        <Link fontSize="lg" onClick={() => router.push("/courses")}>
          Manage Courses
        </Link>
        <Link fontSize="lg" onClick={() => router.push("/courseAssignment")}>
          Course Assignment
        </Link>
        <Link fontSize="lg" onClick={() => router.push("/blockLogin")}>
          Manage Tutors Accounts
        </Link>
        <Link fontSize="lg" onClick={() => router.push("/StatisticalReports")}>
          Statistical Reports
        </Link>
      </VStack>
    </Box>
  );
}
