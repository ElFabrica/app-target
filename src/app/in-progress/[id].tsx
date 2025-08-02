import { useState, useCallback } from "react";

import { Alert, View, } from "react-native";

import { List } from "@/componentes/List";
import { Button } from "@/componentes/Button";
import { Loading } from "@/componentes/Loading";
import { Progress } from "@/componentes/Progress";
import { PageHeader } from "@/componentes/pageHeader";
import { Transaction,TransactionProps } from "@/componentes/Transaction";

import { numeberToCurrent } from "@/utils/numberToCurrent";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

const transactions: TransactionProps[] = [
    {
    id: "1",
    value: "R$ 300,00",
    date: "12/04/2025",
    description: "CDB de 110% do banco XP10",
    type: TransactionTypes.Output

},
{
    id: "2",
    value: "R$ 300,00",
    date: "12/04/2025",
    description: "CDB de 110% do banco XP10",
    type: TransactionTypes.Input

},
{
    id: "3",
    value: "R$ 300,00",
    date: "12/04/2025",
    description: "CDB de 110% do banco XP10",
    type: TransactionTypes.Output

}
]
export default function InProgress(){
        const params = useLocalSearchParams<{id: string}>()
        const [isFetching, setIsFatching ] = useState(true)
        const [details, useDetails] = useState({
            name: "",
            current: "R$ 0,00",
            target: "R$ 0,00",
            porcentage: 0
        }) 


        const targetDatabase = useTargetDatabase()
    
        async function fetchDetails() {
            try {
                const response = await targetDatabase.show(Number(params.id))
                useDetails({
                    name: response.name,
                    current: numeberToCurrent(response.current),
                    target: numeberToCurrent(response.amount),
                    porcentage: response.percentage
                })
                console.log(response)
            } catch (error) {
                Alert.alert("Erro", "Não foi possível exibir os detalhes da meta.")
                console.log(error)
            }
        }

        async function fetchData() {
            const FecthDetailsPromise = fetchDetails()
        
            await Promise.all([FecthDetailsPromise])
            setIsFatching(false)
        }


    
            useFocusEffect(
                useCallback(() => {
                    fetchData()
                }, [])
            )

            if(isFetching){
                return <Loading/>
            }
console.log(params)
    return(
        <View style={{flex:1, padding: 24,  gap: 32}}>
            <PageHeader
            title={details.name}
            key={1}
            subtitle="Meta em andamento"
            rightButton={{
                icon: "edit",
                onPress: ()=>{router.navigate(`/target?id=${params.id}`)

                }
            }}
            
            />
        <Progress
        data={{current:details.current,porcentage: details.porcentage, target: details.target }}
        />

            <List
            title="Transações"
            data={transactions}
            renderItem={({item}) => <Transaction data={item} onRemove={()=> {}}/> }
            emptyMessage ="Nenhuma transação. Toque em uma nova transação para guardar 
            seu primeiro dinheiro aqui "
            />
            <Button
            title="Nova Transação"
            onPress={() => router.navigate(`/transaction/${params.id}`)}
            />
        </View>
    )
}