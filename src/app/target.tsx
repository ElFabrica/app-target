import { View, } from 'react-native'
import React from 'react'
import { router } from "expo-router"

import { fontFamily } from '@/theme/fontFamily'
import { PageHeader } from '@/componentes/pageHeader'
import { Input } from '@/componentes/input'
import { Button } from '@/componentes/Button'


export default function Target() {
  return (
    <View style={{flex: 1, padding:24 }}>
      <PageHeader title='Meta' subtitle='Economize para alcançar sua meta financeira' />

        <View style={{marginTop: 32, gap: 40}}>
          <Input 
          placeholder='Ex: Viagem para praia, Apple Watch'
          label='Nome da meta'/>
        </View>

      <Button title="Salvar" />
    </View>
  )
}
