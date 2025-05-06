//This handles displaying the modal for the view details on the lecturers page
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Application } from "../../types/application";

interface ApplicationDetailsModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  comment: string;
  setComment: (comment: string) => void;
  onSave: () => void;
  onDelete: () => void;
}

export function ApplicationDetailsModal({
  application,
  isOpen,
  onClose,
  comment,
  setComment,
  onSave,
  onDelete,
}: ApplicationDetailsModalProps) {
  if (!application) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Application Details for {application.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={3}>
            <strong>Skills:</strong> {application.skills}
          </Text>
          <Text mb={3}>
            <strong>Previous Roles:</strong> {application.previousRoles}
          </Text>
          <Text mb={3}>
            <strong>Academic Credentials:</strong> {application.academicCredentials}
          </Text>

          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your comments here"
            mb={4}
            size="sm"
            bg="gray.400"
            color="white"
            _placeholder={{ color: "black" }}
            borderColor="gray.500"
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onSave} mr={3}>
            Save Comment
          </Button>
          <Button colorScheme="red" variant={"solid"} onClick={onDelete} mr={3}>
            Delete Application
          </Button>
          <Button variant="ghost" color="red" onClick={onClose} mr={3}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
