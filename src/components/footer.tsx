import { Box, Flex, Text} from '@chakra-ui/react';

const Footer = () => {

    return (
        <Box bg="gray.700" color="white" py={7}>
          <Flex justify="center">
            <Text fontSize={"large"}>&copy; 2025 TeachTeam. All rights reserved.</Text>
          </Flex>
        </Box>
    )
}

export default Footer;