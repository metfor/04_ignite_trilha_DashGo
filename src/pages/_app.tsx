import{AppProps} from"next/app"
import{ChakraProvider}from"@chakra-ui/react"
import {ReactQueryDevtools} from "react-query/devtools"
import{theme}from "../styles/theme"
import { SidebarProvider } from "../contexts/SidebarContext"
import { makeServer } from "../services/mirage"
import{QueryClient, QueryClientProvider}from "react-query"
if(process.env.NODE_ENV ==="development"){
    makeServer();
}
const queryClient =new QueryClient();
function MyApp({ Component, pageProps}:AppProps) {
  return (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider  theme={theme}>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </ChakraProvider>
    <ReactQueryDevtools/>
  </QueryClientProvider>
  )}

export default MyApp
