import { Box, Heading, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Text, Table, Thead, Tbody, Tr, Th, Td, Spinner, Center, Alert, AlertIcon } from "@chakra-ui/react";
import { useLazyQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import Layout from "../components/admin/Layout";

const CHOSEN_CANDIDATES = gql`
  query ChosenCandidates {
    chosenCandidates {
      id
      name
      email
      selectionCount
    }
  }
`;
const POPULAR_CANDIDATES = gql`
  query PopularCandidates {
    popularCandidates {
      id
      name
      email
      selectionCount
    }
  }
`;
const YET_TO_BEGIN = gql`
  query CandidatesYetToBegin {
    candidatesYetToBegin {
      id
      name
      email
      selectionCount
    }
  }
`;

export default function StatisticalReports() {
  const [mounted, setMounted] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | undefined>(undefined);

  const [fetchChosen, { data: chosenData, loading: chosenLoading, error: chosenError }] = useLazyQuery(CHOSEN_CANDIDATES);
  const [fetchPopular, { data: popularData, loading: popularLoading, error: popularError }] = useLazyQuery(POPULAR_CANDIDATES);
  const [fetchYet, { data: yetData, loading: yetLoading, error: yetError }] = useLazyQuery(YET_TO_BEGIN);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleAccordionChange = (index: number | number[]) => {
    const idx = Array.isArray(index) ? index[0] : index;
    setOpenIndex(idx);
    if (idx === 0) fetchChosen();
    if (idx === 1) fetchPopular();
    if (idx === 2) fetchYet();
  };

  return (
    <Layout>
      <Box>
        <Heading as="h2" size="xl" mb={4} color="white">
          Statistical Reports
        </Heading>
        <Text mb={6} color="white">
          Below are the statistical reports for candidates. You can view the chosen, most popular, and yet-to-begin candidates.
        </Text>
        <Box>
          <Accordion allowToggle index={openIndex} onChange={handleAccordionChange}>
            <AccordionItem>
              <AccordionButton bg="gray.700" color="white" _hover={{ bg: "gray.600" }}>
                <Box flex="1" textAlign="left">
                  Chosen Candidates
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} bg="gray.700" color="white">
                <Text mb={2}>List of candidates who've at least been chosen for one course.</Text>
                {chosenLoading && <Center><Spinner /></Center>}
                {chosenError && <Alert status="error"><AlertIcon />{chosenError.message}</Alert>}
                {chosenData && (
                  <Table variant="simple" size="sm" color="white" bg="gray.700" borderRadius="md">
                    <Thead>
                      <Tr>
                        <Th color="white">Name</Th>
                        <Th color="white">Email</Th>
                        <Th color="white">Selection Count</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {chosenData.chosenCandidates.map((user: any) => (
                        <Tr key={user.id}>
                          <Td>{user.name}</Td>
                          <Td>{user.email}</Td>
                          <Td>{user.selectionCount}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                )}
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton bg="gray.700" color="white" _hover={{ bg: "gray.600" }}>
                <Box flex="1" textAlign="left">
                  Popular Candidates
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} bg="gray.700" color="white">
                <Text mb={2}>Candidates chosen for more than 3 courses.</Text>
                {popularLoading && <Center><Spinner /></Center>}
                {popularError && <Alert status="error"><AlertIcon />{popularError.message}</Alert>}
                {popularData && (
                  <Table variant="simple" size="sm" color="white" bg="gray.700" borderRadius="md">
                    <Thead>
                      <Tr>
                        <Th color="white">Name</Th>
                        <Th color="white">Email</Th>
                        <Th color="white">Selection Count</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {popularData.popularCandidates.map((user: any) => (
                        <Tr key={user.id}>
                          <Td>{user.name}</Td>
                          <Td>{user.email}</Td>
                          <Td>{user.selectionCount}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                )}
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton bg="gray.700" color="white" _hover={{ bg: "gray.600" }}>
                <Box flex="1" textAlign="left">
                  Candidates Yet to Begin
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} bg="gray.700" color="white">
                <Text mb={2}>Candidates who have not been chosen for any of the courses, and are yet to begin.</Text>
                {yetLoading && <Center><Spinner /></Center>}
                {yetError && <Alert status="error"><AlertIcon />{yetError.message}</Alert>}
                {yetData && (
                  <Table variant="simple" size="sm" color="white" bg="gray.700" borderRadius="md">
                    <Thead>
                      <Tr>
                        <Th color="white">Name</Th>
                        <Th color="white">Email</Th>
                        <Th color="white">Selection Count</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {yetData.candidatesYetToBegin.map((user: any) => (
                        <Tr key={user.id}>
                          <Td>{user.name}</Td>
                          <Td>{user.email}</Td>
                          <Td>{user.selectionCount}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
    </Layout>
  );
}
