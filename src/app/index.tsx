import { useCallback, useState } from "react";

import { Text, View, StatusBar, Alert } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { List } from "@/componentes/List";
import { Target, TargetProps } from "@/componentes/Target";
import { Button } from "@/componentes/Button";
import { HomeHeader, homeHeaderProps } from "@/componentes/HomeHeader";
import { Loading } from "@/componentes/Loading";

import {numeberToCurrent} from "@/utils/numberToCurrent"

import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { useTargetDatabase } from "@/database/useTargetDatabase";

export default function Index() {
    const [summary, setSummary] = useState<homeHeaderProps >()
    const [isFetching, setIsFetching] =  useState(true)
    const [targets, setTarget] = useState<TargetProps[]>([]) 

    const targetDatabase = useTargetDatabase()
    const transactionsDatabase = useTransactionsDatabase() 

    async function fetchTargets():Promise<TargetProps[]>{
        try {
            const response = await targetDatabase.listByClosestTarget()
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

    async function fetchSummary(): Promise<homeHeaderProps>{
        try {
            const response = await transactionsDatabase.summary()
            return{
                total: numeberToCurrent(response.input + response.output),
                input: {
                    label: "Entradas",
                    value: numeberToCurrent(response.input)
                },
                output: {
                    label: "Saídas",
                    value: numeberToCurrent(response.output)
                }
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar o resumo" )
            console.log(error)
        }
    }

    async function fetchData() {
        const targetDataPromise = fetchTargets()
        const dataSummaryPromise = fetchSummary()

        const [TargetData, dataSummary] = await Promise.all([
            targetDataPromise,
            dataSummaryPromise])

        setTarget(TargetData)
        setSummary(dataSummary)

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
                data={summary}
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