import { View, } from "react-native";

import { PageHeader } from "@/componentes/pageHeader";
import { Progress } from "@/componentes/Progress";
import { List } from "@/componentes/List";
import { Transaction,TransactionProps } from "@/componentes/Transaction";
import { Button } from "@/componentes/Button";

import { TransactionTypes } from "@/urils/TransactionTypes";
import { router, useLocalSearchParams } from "expo-router";

const details =  {
    current: "R$ 1.000,00",
    target: "R$ 5.000,00",
    porcentage: 20
}

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

    return(
        <View style={{flex:1, padding: 24,  gap: 32}}>
            <PageHeader
            title="Apple Watch"
            key={1}
            subtitle="Meta em andamento"
            rightButton={{
                icon: "edit",
                onpress: ()=>{

                }
            }}
            
            />
        <Progress
        data={details}
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