import { View, Text, Button } from 'react-native'
import React from 'react'
import {router} from "expo-router"

export default function Target() {
  return (
    <View style={{justifyContent:"center", flex:1}}>
      <Text>target</Text>
      <Button
      title='Voltar'
      onPress={() => router.back()}
      />
      <Button
      title='Mandar dado'
      onPress={() => router.navigate("/transaction/123")}
      />
      
    </View>
  )
}
