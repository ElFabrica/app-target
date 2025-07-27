import { Tabs, Stack } from "expo-router";
import {
    useFonts,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold
} from "@expo-google-fonts/inter"
import { Loading } from "@/componentes/Loading";


export default function Layout(){

    const [fontsLoades] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold
    })  

    if (!fontsLoades){
        return <Loading/>
    }

    return (
    

<Stack>
    
<Stack.Screen
name="index"
options={{
    title: "Home",
    
}}
/>
</Stack>

)

}