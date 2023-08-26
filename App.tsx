import { SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'
import RootStack from './src/navigators'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RootStack />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})