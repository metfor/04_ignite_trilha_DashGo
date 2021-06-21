import { Box, Flex, Heading, Button, Icon, Table, Th, Tr,Td,  Thead, Checkbox, Tbody, Text, useBreakpointValue,Spinner} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";
import Link from "next/link";

import {useQuery}from "react-query";
import { api } from "../../services/api";

export default function UserList(){
    //pegando dados do usuario e formatando
    //Usando o react query os dados ficam guardados em cache, ajuda a controlar os estados (serever-state libary)
    //stale while revalidate
    const  {data,isLoading, isFetching,error} = useQuery("users",async()=>{
        const {data}=await api.get("http://localhost:3000/api/users");
       
        const users = data.users.map(user =>{
            return{
                id:user.id,
                name:user.name,
                email:user.email,
                createdAt:new Date(user.createdAt).toLocaleString("pt-BR",{
                    day:"2-digit",
                    month:"long",
                    year:"numeric"
                })
            };
        }) ;  
    
         return users;
    },{
        staleTime:1000*5,
    });
    //verificando wideVersion
    const isWideVersion= useBreakpointValue({
        base:false,
        lg:true,
    });
  
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
                            {data.map(user =>{
                               return(
                                <Tr key={user.id}>
                                <Td px={["4","4","6"]}>
                                    <Checkbox colorScheme="pink"/>
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">{user.name}</Text>
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
                    <Pagination/>
                    </>
                    )

                    }
                </Box>
            </Flex>
        </Box>
    )
}