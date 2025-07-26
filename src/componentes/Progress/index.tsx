import { Text, View } from "react-native";

import { styles } from "./styles";

type savedValue = {
    current: string,
    target: string,
    porcentage: number 
}

type Props ={
    data: savedValue
} 

export function Progress({ data }:Props){
    return(
        <View style={styles.container}>
            <Text style={styles.label}>Valor Guardado</Text>
            <View>
                <Text>
                    {data.current}
                    <Text style={styles.targer}> de {data.target}</Text>
                </Text>
            </View>

            <View style={styles.progress}>
        <View style={[styles.currentProgress, {width: `${data.porcentage}%`}]}/>
            </View>
        </View>
    )
}