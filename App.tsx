import React from 'react'
import { SafeAreaView } from 'react-native'

import RootStack from './src/navigators'
import global from './src/styles/global'

const App = () => {
  return (
    <SafeAreaView style={global.container}>
      <RootStack />
    </SafeAreaView>
  )
}

export default App
