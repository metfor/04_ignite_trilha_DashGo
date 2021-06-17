import { Box, Divider, Flex, Heading, SimpleGrid, VStack,HStack,Button} from "@chakra-ui/react";
import * as yup from "yup"
import {SubmitHandler, useForm} from "react-hook-form"
import {yupResolver}from "@hookform/resolvers/yup"
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";
import Link from "next/link";

type CraeteUserFormData={
    name:string;
    email:string;
    password:string;
    password_confirmation:string
  }

  const createUserFormSchema=yup.object().shape({
    name:yup.string().required("Nome obrigatório"),
    email:yup.string().required("Email obrigatório").email("Email invalido"),
    password:yup.string().required("Senha obrigatória").min(8,"Minimo 8 caracteres"),
    password_confirmation:yup.string().oneOf([
        null, yup.ref("password")
    ],"As senhas devem ser iguais")
})

export default function UserCreate(){
    const {register,handleSubmit,formState}=useForm({
        resolver:yupResolver(createUserFormSchema)
    })
    const handleCreateUser:SubmitHandler<CraeteUserFormData>= async (values)=>{
        await new Promise(resolve => setTimeout(resolve,2000));
        console.log(values)
    }
    const{errors}=formState
    return(
        <Box>
            <Header/>
            <Flex w="100%" my="6" maxWidth={1400} mx="auto" px="6" >
                <Sidebar />
                <Box 
                    as="form" 
                    flex="1" 
                    borderRadius={8} 
                    bg="gray.800" 
                    p={["6","8"]}
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                   <Heading size="lg" fontWeight="normal">Criar Usuário</Heading> 
                   <Divider my="6" borderColor="gray.700"/>
                   <VStack spacing="8">
                       <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                           <Input 
                                name="name" 
                                label="Nome completo"
                                error={errors.name}
                                {...register("name")}
                            />
                           <Input 
                                name="email" 
                                type="email" 
                                label="E-mail"
                                error={errors.email}
                                {...register("email")}
                                />
                       </SimpleGrid>
                       <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                           <Input 
                                name="password" 
                                type="password" 
                                label="Senha"
                                error={errors.password}
                                {...register("password")}
                                />
                           <Input 
                                name="password_confirmation" 
                                type="password" 
                                label="Confirme a senha"
                                error={errors.password_confirmation}
                                {...register("password_confirmation")}
                            />
                       </SimpleGrid>

                   </VStack>
                   <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button 
                                type="submit" 
                                colorScheme="pink"
                                isLoading={formState.isSubmitting}
                            >
                                Salvar
                            </Button>
                        </HStack>
                   </Flex>
                </Box>
            </Flex>
        </Box>
    )
}