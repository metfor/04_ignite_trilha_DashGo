import{ Input as ChakraInput,FormLabel,FormControl,InputProps as ChakraInputProps,FormErrorMessage} from "@chakra-ui/react"
import { FieldError } from "react-hook-form";
import { forwardRef ,ForwardRefRenderFunction} from "react";
interface InputProps extends ChakraInputProps{
    name:string;
    label?:string;
    error?:FieldError

}
const InputBase: ForwardRefRenderFunction <HTMLInputElement, InputProps> 
=({name,label,error,...rest},ref)=>{
    return(
        <FormControl isInvalid={!!error}>  
            {!!label&&<FormLabel htmlFor={name}>  {label}
            </FormLabel>}
            
            <ChakraInput
            id={name}
            name={name}
            
            focusBorderColor="pink.500"
            bgColor="gray.900"
            variant="filled"
            _hover={{
              bgColor:"gray.900"
            }}
            ref={ref}
            size="lg"
            {...rest}
            
            />
            {!!error &&(<FormErrorMessage>{error.message}</FormErrorMessage>)}
          </FormControl>
    );
}
export const Input=forwardRef(InputBase)