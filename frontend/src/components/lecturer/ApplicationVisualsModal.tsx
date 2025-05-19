//displays the visual graph for most chosen and least chosen applicant
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
  Table,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
} from "@chakra-ui/react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { User } from "../../types/User";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ApplicantVisualsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mostChosenUsers: User[];
  leastChosenUsers: User[];
  notSelectedUsers: User[];
}

const ApplicantVisualsModal = ({
  isOpen,
  onClose,
  mostChosenUsers,
  leastChosenUsers,
  notSelectedUsers,
}: ApplicantVisualsModalProps) => {
  const data = {
    labels: [`Most Chosen: ${mostChosenUsers[0]?.name}`, `Least Chosen: ${leastChosenUsers[0]?.name}`],
    datasets: [
      {
        data: [
          mostChosenUsers[0]?.selectionCount || 0,
          leastChosenUsers[0]?.selectionCount || 0,
        ],        
        backgroundColor: ["#4caf50", "#f44336"],
        hoverBackgroundColor: ["#45a049", "#e53935"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const index = tooltipItem.dataIndex;
            const users = index === 0 ? mostChosenUsers : leastChosenUsers;
      
            const names = users.map((u) => u.name).join(", ");
            const count = users[0]?.selectionCount || 0;
      
            return `${names}: ${count} selections`;
          },
        },
      },
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Application Visuals</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text color="white" fontSize="lg" mb={2}>
              Visual Representation of Applications
            </Text>
            <Pie data={data} options={options} />
          </Box>

          <Box>
          <Text color="white" fontSize="md">
            <strong>Most Chosen: </strong>
            {mostChosenUsers.map((u) => u.name).join(", ")} ({mostChosenUsers[0]?.selectionCount} selections)
            <br />
            <strong>Least Chosen: </strong>
            {leastChosenUsers.map((u) => u.name).join(", ")} ({leastChosenUsers[0]?.selectionCount} selections)
            <br />
          </Text>
          </Box>

          <Box>
            <Text color="black" fontSize="md">
              <strong>Not Selected Users: </strong> {notSelectedUsers.length}{" "}
              users
            </Text>
            <Table color="black" mt={4}>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {notSelectedUsers.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.name}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ApplicantVisualsModal;
