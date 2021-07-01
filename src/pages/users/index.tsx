import { Box, Flex, Heading, Button, Icon, Table, Th, Tr,Td,  Thead, Checkbox, Tbody, Text, useBreakpointValue,Spinner, Link} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";
import NextLink from "next/link";


import { useUsers } from "../../services/hooks/useUser";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export default function UserList(){
   const [page,setPage]= useState(1) 
    //stale while revalidate
    const  {data,isLoading, isFetching,error} = useUsers(page)
    //verificando wideVersion
    const isWideVersion= useBreakpointValue({
        base:false,
        lg:true,
    });
    async function  handlePrefetchUser (userId:number){
        await queryClient.prefetchQuery(["user",userId],async()=>{
            const response = await api.get(`users/${userId}`)

            return response.data;
        },{
            staleTime:1000*60*10, //10 min
        })
  }
    return(
        <Box>
            <Header/>
            <Flex w="100%" my="6" maxWidth={1400} mx="auto" px="6" >
                <Sidebar />
                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Usuários</Heading>
                        <NextLink href="/users/create" passHref>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine}/>}
                            >
                                Criar novo
                            </Button>
                        </NextLink>
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
                                    {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/> }
                                </Th>
                                {isWideVersion &&<Th>
                                    Data de cadastro
                                </Th>}
                                <Th w="8">

                                </Th>
                            </Tr>
                            
                        </Thead>
                        <Tbody>
                            {data.users.map(user =>{
                               return(
                                <Tr key={user.id}>
                                <Td px={["4","4","6"]}>
                                    <Checkbox colorScheme="pink"/>
                                </Td>
                                <Td>
                                    <Box>
                                        <Link color="purple.400" onMouseEnter={()=>handlePrefetchUser(user.id)}>
                                        <Text fontWeight="bold">{user.name}</Text>
                                        </Link>
                                        <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                    </Box>
                                </Td>
                                {isWideVersion &&<Td>
                                    {user.createdAt}
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
                               )
                            })}
                        </Tbody>
                    </Table>
                    <Pagination
                    totalCountOfRegisters={data.totalCount}
                    currentPage={page}
                    onPageChange={setPage}
                    />
                    </>
                    )

                    }
                </Box>
            </Flex>
        </Box>
    )
}