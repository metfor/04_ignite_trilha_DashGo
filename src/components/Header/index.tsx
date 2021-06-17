import {Flex, IconButton, useBreakpointValue, } from "@chakra-ui/react"
import { Logo } from "./Logo"
import { NotificationNav } from "../Header/NotificationsNav"
import { Profile } from "./Profile"
import { Search } from "./Search"
import { useSidebar } from "../../contexts/SidebarContext"

export function Header(){
    const isWideVersion = useBreakpointValue({
        base:false,
        lg:true,
    })
    const {onOpen}=useSidebar()
  return(
    <Flex
    as="header"
    w="100%"
    maxWidth={1480}
    h="20"
    mx="auto"
    mt="4"
    px="6"
    align="center"
    >{!isWideVersion &&(
        <IconButton
            aria-label="Open navigation"
           
            fontSize="24"
            variant="unstyled"
            onClick={onOpen}
            mr="2"

        >

        </IconButton>
    )}
        <Logo/>
       {isWideVersion&&(<Search/>) }
        
        <Flex
        align="center"
        ml="auto"
        >   
            <NotificationNav/>
            <Profile showProfileData={isWideVersion}/>
            
        </Flex>
    </Flex>
    )
}

