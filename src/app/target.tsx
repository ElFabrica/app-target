import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from "expo-router"
import { fontFamily } from '@/theme/fontFamily'
import { PageHeader } from '@/componentes/pageHeader'

export default function Target() {
  return (
    <View style={{flex: 1, padding:24 }}>
      <PageHeader title='Meta' subtitle='Economize para alcançar sua meta financeira' />
      <Button
        title='Voltar'
        onPress={() => router.back()}
      />
    </View>
  )
}
