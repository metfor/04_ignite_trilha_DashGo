import{Flex,  Button, Stack, } from "@chakra-ui/react"
import {SubmitHandler, useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver}from "@hookform/resolvers/yup"
import {Input} from "../components/Form/Input"
import { useEffect } from "react"
  type SignInFormData={
    email:string;
    password:string;
  }
const signInFormSchema=yup.object().shape({
    email:yup.string().required("Email obrigatório").email("Email invalido"),
    password:yup.string().required("Senha obrigatória")
})

export default function Home() {
  const {register,handleSubmit,formState}=useForm({
    resolver:yupResolver(signInFormSchema)
  })
  
  const handleSignIn:SubmitHandler<SignInFormData> = async (values)=>{
    await new Promise(resolve => setTimeout(resolve,2000))
    console.log(values)
    
  }
  const {errors}=formState
 
  return (
    <Flex
    w="100vw"
    h="100vh"
    align="center"
    justify="center"
    >
      <Flex 
      as="form"
      w="100%"
      maxW={360}
      bg="gray.800"
      p="8"
      borderRadius={8}
      flexDir="column"
      onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack>
          <Input 
            name="email" 
            label="E-mail" 
            type="email"
            error={errors.email}
            {...register("email")}
    
            >
          </Input>
          <Input
            name="password" 
            label="Senha" 
            type="password" 
            error={errors.password}
            {...register("password")}>
            
            </Input>
          
        </Stack>
        <Button type="submit" mt="6" colorScheme="pink" size="lg" isLoading={formState.isSubmitting}>Entrar</Button>
      </Flex>
    </Flex>
  )
}
