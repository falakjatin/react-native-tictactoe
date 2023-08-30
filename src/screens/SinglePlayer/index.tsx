import { StyleSheet, View } from 'react-native'
import React from 'react'

import { StackScreenProps } from '@react-navigation/stack'

import Game from '../../components/Game'
import NavigationBar from '../../components/NavigationBar'
import { RootStackScreensParamList } from '../../navigators'

const SinglePlayerScreen: React.FC<SinglePlayerScreen> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <NavigationBar title='Single Player' onRightSidePress={() => navigation.goBack()} />
      <Game />
    </View>
  )
}

export default SinglePlayerScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

type SinglePlayerScreen = StackScreenProps<RootStackScreensParamList, 'Singleplayer'>