import { useEffect, useState } from 'react'
import { Alert, View, } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import { PageHeader } from '@/componentes/pageHeader' 
import { Input } from '@/componentes/input'
import { Button } from '@/componentes/Button'
import { CurrencyInput } from '@/componentes/CurrencyInput'

import { useTargetDatabase,  } from '@/database/useTargetDatabase'


export default function Target() {
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)
  
  const params = useLocalSearchParams<{id?:string}>()
  
  const targetDatabase =  useTargetDatabase()
  
  function handleSave() {
    if(!name.trim() || amount <= 0){
      return Alert.alert(
        "Atenção",
        "Preencha nome e valor precisa ser maior que zero."
      )
    }
    setIsProcessing(true)
    if(params.id){
      update()
    }else{
      create()
    }
  } 
  
  async function update() {
    try {
      await targetDatabase.update({
        id: Number(params.id),
        name,
        amount
      })
      Alert.alert("Meta", "Meta atualizada com sucesso", [
        {
          text: "Ok",
          onPress:() => router.back() 
        },
      ])
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a meta")
      setIsProcessing(false)
    }
  }
  
  async function create() {
    try {
      await targetDatabase.create({name, amount})
      Alert.alert("Nova meta", "Meta criada com sucesso", [
        {
          text: "Ok",
          onPress:() => router.back() 
        },
        
      ])
      
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a meta")
      setIsProcessing(false)
    }
  }
  
  async function fetchDetails(id:number) {
    try {
      const response = await targetDatabase.show(id)
      setName(response.name)
      setAmount(response.amount)
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.")
      console.log(error)
    }
  }
  
  useEffect(()=>{
    if(params.id){
      fetchDetails(Number(params.id))
    }
  }, [params.id])
  
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader title='Meta' subtitle='Economize para alcançar sua meta financeira' />
      <View style={{ marginTop: 32, gap: 40 }}>
        <Input
          placeholder='Ex: Viagem para praia, Apple Watch'
          label='Nome da meta' 
          onChangeText={setName}
          value={name}
          editable={!isProcessing}
        />
        <CurrencyInput
          label='Valor alvo (R$)'
          value={amount}
          onChangeValue={setAmount}
          editable={!isProcessing}
        />
        <Button 
          title="Salvar" 
          onPress={handleSave}
          isProcessing={isProcessing}
          disabled={isProcessing}
        />
      </View>
    </View>
  )
}
