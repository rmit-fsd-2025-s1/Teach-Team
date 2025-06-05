import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Select,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Application } from "../../types/application";
import { User } from "../../types/User";

interface ApplicationTableProps {
  applications: Application[];
  onSelect: (application: Application) => void;
  onRankChange: (id: string, rank: string | number) => void;
  onViewDetails: (application: Application) => void;
  sortBy: string;
  sortDirection: "asc" | "desc";
  onSort: (column: "course" | "availability") => void;
  getUserByEmail: (email: string) => User | undefined;
}

export function ApplicationTable({
  applications,
  onSelect,
  onRankChange,
  onViewDetails,
  sortBy,
  sortDirection,
  onSort,
  getUserByEmail,
}: ApplicationTableProps) {
  const getSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    return sortDirection === "asc" ? <ChevronUpIcon /> : <ChevronDownIcon />;
  };

  const getOrdinalSuffix = (n: number) => {
    if (n === 1) return "1st";
    if (n === 2) return "2nd";
    if (n === 3) return "3rd";
    return `${n}th`;
  };

  if (applications.length === 0) {
    return (
      <Text color="white" textAlign="center">
        No applications found matching your search.
      </Text>
    );
  }

  return (
    <Box overflowX="auto">
      <Table variant="simple" minWidth="100%" width="100%">
        <Thead>
          <Tr>
            <Th color="white">Select</Th>
            <Th color="white">Name</Th>
            <Th color="white">Email</Th>
            <Th
              color="white"
              cursor="pointer"
              _hover={{ color: "blue.300" }}
              onClick={() => onSort("course")}
              position="relative"
            >
              <Flex align="center" justify="space-between">
                Course
                <Box ml={2}>{getSortIcon("course")}</Box>
              </Flex>
            </Th>
            <Th color="white">Role</Th>
            <Th
              color="white"
              cursor="pointer"
              _hover={{ color: "blue.300" }}
              onClick={() => onSort("availability")}
              position="relative"
            >
              <Flex align="center" justify="space-between">
                Availability
                <Box ml={2}>{getSortIcon("availability")}</Box>
              </Flex>
            </Th>
            <Th color="white" width="200px">
              Rank
            </Th>
            <Th color="white">Selection Count</Th>
            <Th color="white">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {applications.map((application) => {
            const user = getUserByEmail(application.email);

           
            const courseDisplay =
              application.selectedCourseEntity?.courseName ||
              application.selectedCourse; 

            return (
              <Tr key={application.id} _hover={{ bg: "gray.600" }}>
                <Td>
                  <Button
                    size="sm"
                    colorScheme={application.isSelected ? "green" : "blue"}
                    _hover={{
                      bg: application.isSelected ? "red.500" : "green.400",
                    }}
                    onClick={() => onSelect(application)}
                  >
                    {application.isSelected ? "Unselect" : "Select"}
                  </Button>
                </Td>
                <Td color="white">{application.name}</Td>
                <Td color="white">{application.email}</Td>
                <Td color="white">{courseDisplay}</Td>
                <Td color="white">{application.role}</Td>
                <Td color="white">{application.availability}</Td>
                <Td color="white" padding={5}>
                  <Select
                    value={application.rank || ""}
                    onChange={(e) =>
                      onRankChange(application.id, e.target.value)
                    }
                    color="black"
                    bg="gray.600"
                    size="sm"
                  >
                    <option value="">Rank</option>
                    {Array.from({ length: applications.length }, (_, i) => {
                      const rankValue = (i + 1).toString();

                      const isUsed = applications.some(
                        (app) =>
                          app.rank?.toString() === rankValue &&
                          app.id !== application.id
                      );

                      return (
                        <option
                          key={rankValue}
                          value={rankValue}
                          disabled={isUsed}
                        >
                          {getOrdinalSuffix(i + 1)}
                        </option>
                      );
                    })}
                  </Select>
                </Td>
                <Td color="white">{user?.selectionCount || 0}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => onViewDetails(application)}
                  >
                    View Details
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
