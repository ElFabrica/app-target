import { View, Text, Button } from 'react-native'
import React from 'react'
import {router} from "expo-router"

export function Target() {
  return (
    <View style={{justifyContent:"center", flex:1}}>
      <Text>target</Text>
      <Button
      title='Voltar'
      onPress={() => router.navigate("index")}
      />

      
    </View>
  )
}
