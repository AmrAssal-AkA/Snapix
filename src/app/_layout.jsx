import { Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Header from '../components/Header'

const AppLayout = () => {
  return (
    <Stack screenOptions={{ header: () => <Header />}}>
        <Stack.Screen name='(auth)' options={{ header: () => <Header /> }} />
        <Stack.Screen name="(tabs)"  />
    </Stack>

  )
}

export default AppLayout

