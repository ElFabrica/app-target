import { View, Text, Button } from "react-native";

import { router } from "expo-router";
import { PageHeader } from "@/componentes/pageHeader";
import { Progress } from "@/componentes/Progress";

export default function InProgress(){
const details = {
    current: "R$ 580,00",
    target: "R$1,970,00",
    porcentage: 25
    }
    

    return(
        <View style={{flex:1, padding: 24,  gap: 32}}>
            <PageHeader
            title="Apple Watch"
            key={1}
            subtitle="Meta em andamento"
            rightButton={{
                icon: "edit",
                onpress: ()=>{

                }
            }}
            />
        <Progress
        data={details}
        />
        </View>
    )
}