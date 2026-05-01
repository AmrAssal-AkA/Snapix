import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'


const ProfilePage = () => {
  return (
    <View style={styles.container}  >
      <Text>ProfilePage</Text>
      <Link href="(auth)/login">Go to Login</Link>
    </View>
  )
}

export default ProfilePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})