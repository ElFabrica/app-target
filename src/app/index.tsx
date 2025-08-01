import { useCallback, useState } from "react";

import { Text, View, StatusBar, Alert } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { List } from "@/componentes/List";
import { Target, TargetProps } from "@/componentes/Target";
import { Button } from "@/componentes/Button";
import { HomeHeader } from "@/componentes/HomeHeader";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { Loading } from "@/componentes/Loading";

import {numeberToCurrent} from "@/utils/numberToCurrent"

    const Summary = {
        total: "R$ 2.680,00",
        input: { label: "Entradas", value: "R$ 6,184.90" },
        output: { label: "Saídas", value: "-R$ 883.65" },
        
    }

export default function Index() {
    const [isFetching, setIsFetching] =  useState(true)
    const [targets, setTarget] = useState<TargetProps[]>([]) 

    const targetDatabase = useTargetDatabase()

    async function fetchTargets():Promise<TargetProps[]>{
        try {
            const response = await targetDatabase.listBySavedValue()
            return response.map((item) =>({
                id: String(item.id),
                name: item.name,
                current: numeberToCurrent(item.current),
                percentage: item.percentage.toFixed(0) + "%",
                target: numeberToCurrent(item.amount)
            }))
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar as metas")
            console.log(error)
        }
    }

    async function fetchData() {
        const targetDataPromise = fetchTargets()

        const [TargetData] = await Promise.all([targetDataPromise])

        setTarget(TargetData)

        setIsFetching(false)
    }

    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [])
    )
    if (isFetching){
        return <Loading/>
    }


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