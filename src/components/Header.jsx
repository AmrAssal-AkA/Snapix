import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.container}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ff6200' }}>Snapix</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    }
})