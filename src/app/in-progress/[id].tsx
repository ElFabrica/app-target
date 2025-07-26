import { View, Text, Button } from "react-native";

import { router } from "expo-router";
import { PageHeader } from "@/componentes/pageHeader";
import { Progress } from "@/componentes/Progress";

export default function InProgress(){

    

    return(
        <View style={{flex:1, padding: 24,  gap: 32}}>
            <PageHeader
            title="Apple Watch"
            rightButton={{
                icon: "edit",
                onpress: ()=>{

                }
            }}
            />
        <Progress
        data={{
            current.p
        }}
        />
        </View>
    )
}