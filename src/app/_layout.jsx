import { Alert, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";



function RouteGuard(){
  const router = useRouter();
  const {user, loading} = useAuth();
  const segments = useSegments();


  useEffect(() => {
    if(loading) return;

  const inAuthGroup = segments[0] === "(auth)";

      if(user && inAuthGroup){
        router.replace("/(tabs)/");
      }else if(!user && !inAuthGroup){
          router.replace("/(auth)/login");
        }else{
          console.log("User is authenticated and in the correct route group.");
        }
  }, [user, segments, router, loading])

  return (
        <Stack screenOptions={{
      headerShown: false,
      headerTintColor: "#fff",
      headerTitleStyle: { fontWeight: "bold" },
    }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      <Stack.Screen name="(auth)" />
    </Stack>
  )
}



const AppLayout = () => {

  return (
    <AuthProvider>
      <RouteGuard />
</AuthProvider>
  );
};

export default AppLayout;
