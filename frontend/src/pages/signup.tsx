import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Footer from "../components/footer";
import Header from "../components/header";
import {
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  List,
  ListItem,
  HStack,
  Icon,
  useToast,
  SimpleGrid,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  WarningIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLecturer, setIsLecturer] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const validLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password !== "" && password === confirm;
  const allValid =
    validLength &&
    hasUpper &&
    hasLower &&
    hasDigit &&
    hasSpecial &&
    passwordsMatch;

  const checks = [
    { ok: validLength, label: "At least 8 characters" },
    { ok: hasUpper, label: "Uppercase letter (A-Z)" },
    { ok: hasLower, label: "Lowercase letter (a-z)" },
    { ok: hasDigit, label: "Number (0-9)" },
    { ok: hasSpecial, label: "Special character (!@#*…)" },
    { ok: passwordsMatch, label: "Passwords match" },
  ];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!allValid) {
      toast({
        title: "Invalid input",
        description: "Please ensure all password requirements are met.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
        isLecturer: isLecturer,
      });

      toast({
        title: "Account created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/login");
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const renderCheck = (condition: boolean) => (
    <Icon
      as={condition ? CheckCircleIcon : WarningIcon}
      color={condition ? "green.400" : "orange.300"}
      mr={2}
    />
  );

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />

      <Flex
        flex="1"
        justifyContent="center"
        alignItems="center"
        bg={"gray.800"}
      >
        <Box
          bg="gray.700"
          p={{ base: 6, md: 8 }}
          rounded="lg"
          w="full"
          maxW="480px"
        >
          <Text
            fontSize="2xl"
            fontWeight="bold"
            mb={6}
            textAlign="center"
            color={"teal.300"}
          >
            Signup
          </Text>

          <form>
            <FormControl mb={4}>
              <FormLabel htmlFor="name" color={"teal.300"}>
                Full Name
              </FormLabel>
              <Input
                id="name"
                type="text"
                color={"white"}
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="email" color={"teal.300"}>
                Email
              </FormLabel>
              <Input
                id="email"
                type="email"
                color={"white"}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="password" color={"teal.300"}>
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  color={"white"}
                  id="password"
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputRightElement>
                  <IconButton
                    variant={"ghost"}
                    h="1.75rem"
                    size="sm"
                    color={"white"}
                    aria-label="Show Password"
                    onClick={(e) => (show ? setShow(false) : setShow(true))}
                    icon={show ? <ViewOffIcon /> : <ViewIcon />}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl mb={4} isRequired>
              <FormLabel color="teal.300">Confirm Password</FormLabel>

              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Re-enter password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  color="white"
                />
                <InputRightElement>
                  <IconButton
                    variant={"ghost"}
                    h="1.75rem"
                    size="sm"
                    color={"white"}
                    aria-label="Show Password"
                    onClick={(e) => (show ? setShow(false) : setShow(true))}
                    icon={show ? <ViewOffIcon /> : <ViewIcon />}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Box mb={4}>
              <Text color="white" fontSize="sm" mb={2}>
                {checks.every((c) => c.ok) ? "" : ""}
              </Text>

              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={1}
                maxH="120px"
                overflowY="auto"
                fontSize="sm"
              >
                {checks
                  .filter((c) => !c.ok)
                  .map((c) => (
                    <HStack key={c.label} spacing={1}>
                      <Icon
                        as={WarningIcon}
                        color="orange.300"
                        boxSize="16px"
                      />
                      <Text color="whiteAlpha.800">{c.label}</Text>
                    </HStack>
                  ))}
              </SimpleGrid>
            </Box>

            <FormControl mb={3}>
              <Checkbox
                onChange={(e) => setIsLecturer(e.target.checked)}
                color={"teal.300"}
                fontWeight={"medium"}
              >
                I am a Lecturer
              </Checkbox>
            </FormControl>

            <Button
              onClick={onSubmit}
              bgGradient="linear(to-r, blue.500, teal.300)"
              width="100%"
              type="submit"
              _hover={{ bgGradient: "linear(to-r, teal.500, blue.300)" }}
            >
              Sign up
            </Button>
          </form>
        </Box>
      </Flex>

      <Footer />
    </Box>
  );
}
