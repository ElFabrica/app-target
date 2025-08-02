import { useCallback, useState } from "react";
import { Alert, Text, View } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { PageHeader } from "@/componentes/pageHeader";
import { Input } from "@/componentes/input";
import { Button } from "@/componentes/Button";  
import { CurrencyInput } from "@/componentes/CurrencyInput";
import { TransactionType } from "@/componentes/TransactionType";
import { TransactionTypes } from "@/utils/TransactionTypes";

import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";

export default function Transaction(){
    const [amount, setAmount] = useState(0)
    const [observation, setObservation] = useState("")
    const [isCreating, setIsCreating] = useState(false)
    const [type, setType] = useState (TransactionTypes.Input)

    const params = useLocalSearchParams<{id: string}>()
    const transactionDatabase = useTransactionsDatabase()

    async function handleCreate() {
        try {
            if(amount <= 0){
                return Alert.alert("Atenção", "Preencha o valor. A transação tem que ser maior que zero.")
            }
            await transactionDatabase.create({
                target_id: Number(params.id),
                amount: type === TransactionTypes.Output ? amount * -1 : amount,
                observation: observation
            })
            Alert.alert("Sucesso", "Transação salva com sucesso", [
                {
                    text: "Ok",
                    onPress:router.back
                }

            ])
            setIsCreating(true)
        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar a transação")
            setIsCreating(false)
        }
    }


    return(
        <View style={{flex:1, padding: 24}}>
            <PageHeader
            title="Nova Transação"
            subtitle="A cada valor gerado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
            />
            <View style={{marginTop:32, gap: 24}}>
                <TransactionType
                selected={type}
                onChange={setType}
                />
            <CurrencyInput
            label="Valor (R$)"
            value= {amount}
            onChangeValue={setAmount}
            />
            <Input
            label="Motivo (opcional)"
            placeholder="Ex: Investir em CDB de 110% no banco XP10"
            value={observation}
            onChangeText={setObservation}
            />
            <Button
            title="Salvar "
            onPress={handleCreate}
            isProcessing ={isCreating}
            />
            </View>
            
        </View>
    )
}