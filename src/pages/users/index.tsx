import { Box, Flex, Heading, Button, Icon, Table, Th, Tr,Td,  Thead, Checkbox, Tbody, Text, useBreakpointValue,Spinner} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";
import Link from "next/link";
import { useEffect } from "react";
import {useQuery}from "react-query"

export default function UserList(){
    const  {data,isLoading, error} = useQuery("users",async()=>{
        const response=await fetch("http://localhost:3000/api/users");
        const data = await response.json();
        return data;
    })
    
    const isWideVersion= useBreakpointValue({
        base:false,
        lg:true,
    })
  
    return(
        <Box>
            <Header/>
            <Flex w="100%" my="6" maxWidth={1400} mx="auto" px="6" >
                <Sidebar />
                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Usuários</Heading>
                        <Link href="/users/create" passHref>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine}/>}
                            >
                                Criar novo
                            </Button>
                        </Link>
                    </Flex>
                    { isLoading ?(
                        <Flex justify="center">
                            <Spinner/>

                            
                        </Flex>
                    ):error ?(
                        <Flex justify="center">
                            <Text>Falha ao obter dados dos usuarios</Text>
                        </Flex>
                    ):(<>
                        <Table colorScheme="whiteAlpha">
                        <Thead>
                            <Tr>
                                <Th px={["4","4","6"]} color="gray.300" width="8">
                                    <Checkbox colorScheme="pink"/>
                                </Th>
                                <Th>
                                    Usuário
                                </Th>
                                {isWideVersion &&<Th>
                                    Data de cadastro
                                </Th>}
                                <Th w="8">

                                </Th>
                            </Tr>
                            
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td px={["4","4","6"]}>
                                    <Checkbox colorScheme="pink"/>
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Matheus Frade</Text>
                                        <Text fontSize="sm" color="gray.300">matheus.frade@pixter.com.br</Text>
                                    </Box>
                                </Td>
                                {isWideVersion &&<Td>
                                    14 de Junho, 2021
                                </Td>}
                                <Td>
                                    <Button
                                        as="a"
                                        size="sm"
                                        fontSize="sm"
                                        colorScheme="pink"
                                        leftIcon={<Icon as={RiPencilLine}/>}
                                    >
                                        {isWideVersion ? "Editar":""}
                                    </Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                    <Pagination/>
                    </>
                    )

                    }
                </Box>
            </Flex>
        </Box>
    )
}