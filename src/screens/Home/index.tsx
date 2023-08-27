import { View } from 'react-native'
import React from 'react'

import Game from '../../components/Game'

import styles from './styles'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Game />
    </View>
  )
}

export default HomeScreen