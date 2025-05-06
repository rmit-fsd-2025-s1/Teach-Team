//This handles searching for suitable applicants based on the chosen criteria and the search bar

import { Input, Select, HStack } from "@chakra-ui/react";

interface ApplicationSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export function ApplicationSearch({ 
  searchQuery, 
  setSearchQuery, 
  sortBy, 
  setSortBy 
}: ApplicationSearchProps) {
  return (
    <HStack spacing={4} mb={6}>
      <Input
        placeholder="Search applicants..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        bg="gray.600"
        color="white"
        _placeholder={{ color: "gray.300" }}
        borderColor="gray.500"
        _hover={{ borderColor: "gray.400" }}
        _focus={{ borderColor: "blue.500" }}
      />
      <Select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        color="white"
        bg="black"
        sx={{
          option: {
            background: "black",
            color: "white",
          },
        }}
        w="200px"
      >
        <option value="availability">Availability</option>
        <option value="skills">Skills</option>
        <option value="name">Name</option>
        <option value="selectedCourse">Course</option>
      </Select>
    </HStack>
  );
} 