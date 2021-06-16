import {Text,Link as ChakraLink, Icon, LinkProps as ChakraLinkProps} from "@chakra-ui/react"
import { ElementType } from "react"

import { ActiveLink } from "../ActiveLink"
interface NavLinkProps extends ChakraLinkProps{
    icon:ElementType,
    text:string,
    href:string,

}
export function NavLink({icon,text,href, ...rest}:NavLinkProps){
    return(
        <ActiveLink href={href} passHref>
            <ChakraLink display="flex" align="center" color="pink.400"{...rest}>
                <Icon as={icon} fontSize="20"/>
                <Text ml="4" fontWeight="medium">{text}</Text>
            </ChakraLink>
        </ActiveLink>
    )
}