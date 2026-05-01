import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'


const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Link href="(auth)/login">Go to Login</Link>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})