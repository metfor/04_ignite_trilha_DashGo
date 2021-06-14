import {Text,Link, Icon, LinkProps as ChakraLinkProps} from "@chakra-ui/react"
import { ElementType } from "react"
interface NavLinkProps extends ChakraLinkProps{
    icon:ElementType,
    text:string

}
export function NavLink({icon,text, ...rest}:NavLinkProps){
    return(
        <Link display="flex" align="center" color="pink.400"{...rest}>
            <Icon as={icon} fontSize="20"/>
            <Text ml="4" fontWeight="medium">{text}</Text>
        </Link>
    )
}