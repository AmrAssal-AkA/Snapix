import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Header = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#ff6200' }}>Snapix</Text>
        
        <View style={styles.iconRight}>
            <FontAwesome name="plus" size={20} color="#ff6200" />
        </View>
  
      <View style={styles.iconleft}>
        <FontAwesome name="bell" size={20} color="#ff6200" />
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingBottom: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconRight: {
        position: 'absolute',
        right: 20,
        bottom: 15,
    },
    iconleft: {
        position: 'absolute',
        left: 20,
        bottom: 15,
    }
})