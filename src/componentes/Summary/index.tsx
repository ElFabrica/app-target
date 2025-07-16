import { View, Text, ColorValue } from "react-native";
import {MaterialIcons} from "@expo/vector-icons"

import { styles } from "./styles";

export type SummaryProps ={
    label: string,
    value: string
}

type props ={
    data: SummaryProps
    icon:{
        name: keyof typeof MaterialIcons.glyphMap,
        color: ColorValue
    }
    isLeft?:boolean
}


export function Summary({data, icon, isLeft = false}: props) {
    return(
        <View style={[styles.header, isLeft && {justifyContent: "flex-end"}]}>
            <View>
            <MaterialIcons 
            name={icon.name} 
            color={icon.color}
            size={16}
            
            />

            <Text style={styles.label}> {data.label} </Text>
            </View>
            <Text style={styles.value}> {data.value } </Text>
        </View>
    )

}