import { Header } from "../components/Header"
import dynamic from "next/dynamic"
import { Sidebar } from "../components/Sidebar"
import { Flex, SimpleGrid, Box, Text, theme } from "@chakra-ui/react"

const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
})
const options = {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        foreColor: theme.colors.gray[500]
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: false,
    },
    xaxis: {
        type: "datetime",
        axisBorder: {
            color: theme.colors.gray[600]
        },
        axisTicks: {
            color: theme.colors.gray[600]
        },
        categories: [
            "2021-02-11T00:00:00.000Z",
            "2021-02-12T00:00:00.000Z",
            "2021-02-13T00:00:00.000Z",
            "2021-02-14T00:00:00.000Z",
            "2021-02-15T00:00:00.000Z",
            "2021-02-16T00:00:00.000Z",
            "2021-02-17T00:00:00.000Z",
            
        ],
    },
    fill:{
        opacoty:0.3,
        type:"gradient",
        gradient:{
            shade:"dark",
            opacityFrom: 0.7,
            opacityTo:0.3,
        }
    }
};
const series = [
    { name: "series1", data: [31, 10, 120, 50, 60, 140, 100] }
]
export default function Dashboard() {
    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%" my="6" maxWidth={1400} mx="auto" px="6" >
                <Sidebar />
                <SimpleGrid flex="1" gap="4" minChildWidth="320px" >
                    <Box
                        p={["6","8"]}
                        bg="gray.800"
                        borderRadius={8}
                    >
                        <Text fontSize="lg" mb="4">Inscritos da semana</Text>
                        <Chart options={options} series={series} type="area" height={160} />
                    </Box>
                    <Box
                        p={["6","8"]}
                        bg="gray.800"
                        borderRadius={8}
                    >
                        <Text fontSize="lg" mb="4">Taxa de abertura</Text>
                        <Chart options={options} series={series} type="area" height={160} />
                    </Box>
                </SimpleGrid>
            </Flex>
        </Flex>
    )
}