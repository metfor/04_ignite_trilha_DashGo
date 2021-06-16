import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { createContext, ReactNode, useContext, useEffect } from "react";
interface SidebarProviderProps{
    children:ReactNode
}
type SidebarContextData = UseDisclosureReturn
const SidebarContext = createContext({}as SidebarContextData);

export function SidebarProvider({children}:SidebarProviderProps){
    const router = useRouter()
    useEffect(()=>{
        disclosure.onClose()
    },[router.asPath])
    const disclosure =useDisclosure()
    return(
        <SidebarContext.Provider value={disclosure}>
            {children}
        </SidebarContext.Provider>
    )
}
export const useSidebar = () => useContext(SidebarContext)