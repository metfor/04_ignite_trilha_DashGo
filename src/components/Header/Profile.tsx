import {Box, Avatar, Flex, Text} from "@chakra-ui/react"
export function Profile(){
    return(
        <Flex
            align="center"
            >
                <Box mr="4" textAlign="right">
                    <Text>Matheus Pereira Frade</Text>
                    <Text color="gray.300" fontSize="small">
                        matheus.frade@pixter.com.br
                    </Text>
                </Box>
                <Avatar size="md" name="Matheus Frade"/>
            </Flex>
    )
} 