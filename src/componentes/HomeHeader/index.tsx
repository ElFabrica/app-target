import {LinearGradient} from "expo-linear-gradient" 

import { styles } from "./styles"
import { colors } from "@/theme/colors"
import { Text, View } from "react-native"
import { Separator } from "../Separator"

export type homeHeaderProps ={
     total: string
}

type props ={
    data: homeHeaderProps
}

export function HomeHeader({data}: props){
    return(
        <LinearGradient 
        colors={[colors.blue[500], colors.blue[800]]}
        style={styles.container}
        >
            <View>
                <Text style={styles.label}>
                    Total que você possui
                </Text>
                <Text style={styles.total}>{data.total}</Text>
                

            </View>
            <Separator
                color={colors.blue[400]}
                />
        </LinearGradient>

    )
}