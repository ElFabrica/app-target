import {LinearGradient} from "expo-linear-gradient" 

import { styles } from "./styles"
import { Text, View } from "react-native"

import { colors } from "@/theme/colors"
import { Separator } from "../Separator"
import { Summary, SummaryProps } from "../Summary"

export type homeHeaderProps ={
     total: string,
     input: SummaryProps,
     output: SummaryProps
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

                <View style={styles.summary}>
                    <Summary
                    data={data.input}
                    icon={{name: "arrow-upward", color: colors.green[500]}}
                    />

                    <Summary
                    data={data.output}
                    icon={{name: "arrow-downward", color: colors.red[400]}}
                    isRight
                    />
                </View>
        </LinearGradient>

    )
}