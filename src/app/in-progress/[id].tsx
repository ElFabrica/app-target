import { useState, useCallback } from "react";
import { Alert, View, StatusBar } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import dayjs from "dayjs";

import { List } from "@/componentes/List";
import { Button } from "@/componentes/Button";
import { Loading } from "@/componentes/Loading";
import { Progress } from "@/componentes/Progress";
import { PageHeader } from "@/componentes/pageHeader";
import { Transaction,TransactionProps } from "@/componentes/Transaction";

import { numeberToCurrent } from "@/utils/numberToCurrent";
import { TransactionTypes } from "@/utils/TransactionTypes";

import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";

export default function InProgress(){
        const [transactions, setTransactions] = useState<TransactionProps[]>([]) 
        const params = useLocalSearchParams<{id: string}>()
        const [isFetching, setIsFatching ] = useState(true)
        const [details, useDetails] = useState({
            name: "",
            current: "R$ 0,00",
            target: "R$ 0,00",
            porcentage: 0
        }) 


        const targetDatabase = useTargetDatabase()
        const transactionsDatabase = useTransactionsDatabase()
    
        async function fetchTargetDetails () {
            try {
                const response = await targetDatabase.show(Number(params.id))
                useDetails({
                    name: response.name,
                    current: numeberToCurrent(response.current),
                    target: numeberToCurrent(response.amount),
                    porcentage: response.percentage
                })
                //console.log(response)
            } catch (error) {
                Alert.alert("Erro", "Não foi possível exibir os detalhes da meta.")
                console.log(error)
            }
        }

        async function fetchTransactions() {
            try {
                const response = await transactionsDatabase.listByTargetId(
                    Number(params.id)
                    )
                setTransactions(
                    response.map((item) => ({
                    id: String(item.id),
                    value: numeberToCurrent(item.amount),
                    date: dayjs(item.created_at).format("DD/MM/YYYY [às] HH:MM"),
                    description: item.observation,
                    type: item.amount < 0 ?TransactionTypes.Output :  TransactionTypes.Input
                })
                    ))
            } catch (error) {
                Alert.alert("Erro", "Não foi possível carregar as transações.")
            }
        }

        async function fetchData() {
            const FecthDetailsPromise = fetchTargetDetails()
            const FetchTransactionsPromise = fetchTransactions()
            
            await Promise.all([FecthDetailsPromise, FetchTransactionsPromise])
            setIsFatching(false)
        }

        function handlerTransactionRemove(id:string){
         
                Alert.alert("Remover", "Deseja realmente remover ?",[

                    {text: "Não", style: "cancel"},
                    {text: "Sim", onPress:() => transactionRemove(id)}


                ])
          
            } 
        async function transactionRemove(id:string) {
            try {
                await transactionsDatabase.remove(Number(id))
                fetchData()
                Alert.alert("Removido", "Transação removida com sucesso!")
            } catch (error) {
                Alert.alert("Erro", "Não foi possível remover a transação.")
            }
        }

            useFocusEffect(
                useCallback(() => {
                    fetchData()
                    
                }, [])
            )

            if(isFetching){
                return <Loading/>
            }
            //console.log(params)
    return(
        <View style={{flex:1, padding: 24,  gap: 32}}>

            <StatusBar barStyle="dark-content"/>

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
            renderItem={({item}) => <Transaction data={item} onRemove={()=> handlerTransactionRemove(item.id)}/> }
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