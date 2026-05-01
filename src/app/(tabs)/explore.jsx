import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ExplorePage = () => {
  return (
    <View style={styles.container}>
      <Text>ExplorePage</Text>
    </View>
  )
}

export default ExplorePage

const styles = StyleSheet.create({
        container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})