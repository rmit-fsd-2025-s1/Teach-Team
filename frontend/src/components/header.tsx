import {
  Box,
  Flex,
  Text,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { ChevronDownIcon, InfoIcon } from "@chakra-ui/icons";
import { formatDate } from "../utils/formatDate";

export default function Header() {
  const { user, logout } = useAuth();
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <Box bg="gray.700" color="white" py={4}>
      <Flex justify="space-between" align="center" px={8}>
        <Text fontSize="2xl" fontWeight="bold" color={"teal.300"}>
          <Link _hover={{ textDecoration: "none" }} href="/">
            TeachTeam
          </Link>
        </Text>

        {user ? (
          <Flex align="center">
            <Menu>
              <MenuButton
                as={Button}
                colorScheme={"teal"}
                bg={"teal.500"}
                rightIcon={<ChevronDownIcon />}
              >
                Welcome {user.name}
              </MenuButton>
              <MenuList bg="gray.700" color="white">
                <MenuItem
                  bg="gray.700"
                  justifyContent="center"
                  fontWeight={"bold"}
                  gap={2}
                  onClick={onOpen}
                  icon={<InfoIcon color={"black"} boxSize={"25px"} />}
                >
                  Profile
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  bg="gray.700"
                  color="red"
                  justifyContent="center"
                  fontWeight={"bold"}
                  onClick={logout}
                  icon={
                    <img
                      src="./logout.svg"
                      style={{
                        filter:
                          "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)",
                      }}
                    />
                  }
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          <Button
            bgGradient="linear(to-r, teal.300, blue.500)"
            _hover={{ bgGradient: "linear(to-r, blue.500, teal.300)" }}
            size="md"
          >
            <Link href="/login" _hover={{ textDecoration: "none" }}>
              Get Started
            </Link>
          </Button>
        )}
      </Flex>


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text fontWeight="bold">Name:</Text>
              <Text>{user?.name}</Text>
            </Box>
            <Box mt={4}>
              <Text fontWeight="bold">Email:</Text>
              <Text>{user?.email}</Text>
            </Box>
            <Box mt={4}>
              <Text fontWeight="bold">Role:</Text>
              <Text>{user?.isLecturer ? "Lecturer" : "Tutor"}</Text>
            </Box>
            <Box mt={4}>
              <Text fontWeight="bold">Account Created At:</Text>
                <Text>
                {formatDate(user?.createdAt)}
                </Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>



  );
}
