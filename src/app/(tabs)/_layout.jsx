import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const RootLayout = () => {
  const [focused, setFocused] = useState(false)

  return (
    <Tabs screenOptions={{
        headerShown: false,
        tabBarLabel: "",
        tabBarStyle: {
            position: 'absolute',
            bottom: 10,
            left: 10,
            right: 10,
            elevation: 0,
            backgroundColor: '#fff',
            borderRadius: 15,
            height: 60,
        }
    }}>
        <Tabs.Screen name="index" options={{title: "Home", tabBarIcon: ({focused}) => <Ionicons name="home" size={24} color={focused ? "#ff6200" : "#000"} /> }} />
        <Tabs.Screen name="messages" options={{title: "Messages", tabBarIcon: ({focused}) => <Ionicons name="chatbox" size={24} color={focused ? "#ff6200" : "#000"}   /> }} />
        <Tabs.Screen name="explore" options={{title: "Explore", tabBarIcon: ({focused}) => <Ionicons name="search" size={24} color={focused  ? "#ff6200" : "#000"}   /> }} />
        <Tabs.Screen name="profile" options={{title: "Profile", tabBarIcon: ({focused}) => <Ionicons name="person" size={24} color={focused ? "#ff6200" : "#000"}     /> }} />
    </Tabs>
  )
}

export default RootLayout
