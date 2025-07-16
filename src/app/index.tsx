import { Text, View, Button } from "react-native";
import { router } from "expo-router";
import { HomeHeader } from "@/componentes/HomeHeader";


export default function Index() {

    const Summary ={
        total: "R$ 2.680,00",
        input: {label:"Entradas", value: "R$ 6,184.90" },
        output:  {label:"Saídas", value: "-R$ 883.65" }
    }

    return(
        <View>
            <HomeHeader
            data={Summary}
            />
            
        
        </View>
    )
}