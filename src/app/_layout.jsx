import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { supabase } from '../utils/supabase'

const AppLayout = () => {
  const [session, setsession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setsession(session);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setsession(session);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [])

  return (
    <Stack > 
        <Stack.Screen name='index' options={{title: "Welcome", headerShown: false}} />
        <Stack.Screen name='(auth)' options={{title: "Account Management"}} />
        <Stack.Screen name="(tabs)" options={{title: "Home" , headerShown: false }} />
    </Stack>

  )
}

export default AppLayout

