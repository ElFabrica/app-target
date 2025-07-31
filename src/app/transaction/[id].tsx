import { useState } from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { PageHeader } from "@/componentes/pageHeader";
import { Input } from "@/componentes/input";
import { Button } from "@/componentes/Button";  
import { CurrencyInput } from "@/componentes/CurrencyInput";
import { TransactionType } from "@/componentes/TransactionType";
import { TransactionTypes } from "@/utils/TransactionTypes";

export default function Transaction(){

    const [type, setType] = useState (TransactionTypes.Input)

    const params = useLocalSearchParams<{id: string}>()
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
            value= {0}
            />
            <Input
            label="Motivo (opcional)"
            placeholder="Ex: Investir em CDB de 110% no banco XP10"
            />
            <Button
            title="Salvar "
            onPress={() =>{}}
            />
            </View>
            
        </View>
    )
}