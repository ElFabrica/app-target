import { useCallback } from "react";

import { Text, View, StatusBar, Alert } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { List } from "@/componentes/List";
import { HomeHeader } from "@/componentes/HomeHeader";
import { Target } from "@/componentes/Target";
import { Button } from "@/componentes/Button";
import { useTargetDatabase } from "@/database/useTargetDatabase";



    const Summary = {
        total: "R$ 2.680,00",
        input: { label: "Entradas", value: "R$ 6,184.90" },
        output: { label: "Saídas", value: "-R$ 883.65" },
        
    }
    const targets = [
        {
            id: "1",
            current: "200",
            name: "O caba lá",
            percentage: "10",
            target: "10"
        },
        {
            id: "2",
            current: "400",
            name: "O caba lá 2.0",
            percentage: "10",
            target: "10"
        }
    ]


export default function Index() {

    const targetDatabase = useTargetDatabase()

    async function fetchTargets(){
        try {
            const response = await targetDatabase.listBySavedValue()
            console.log(response)
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar as metas")
            console.log(error)
        }
    }

    useFocusEffect(
        useCallback(() => {}, [])
    )


    return (
        < View style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar 
            barStyle="light-content"
            />
            <HomeHeader
                data={Summary}
            />
            
            <List
            data={targets}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <Target data={item} onPress={()=> router.navigate(`/in-progress/${item.id}`)} /> }
            title="Metas"
            emptyMessage="Nenhuma meta. Toque em nova meta para adicionar"
            containerStyle={{paddingHorizontal: 24}}
            />

                <View style={{padding:24, paddingBottom:32}}>
            <Button
            title="Nova meta"
            onPress={()=> router.navigate("/target")}
            isProcessing={false}
            
            />
            </View>

        </View>
    )
}