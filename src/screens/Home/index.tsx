import { View } from 'react-native'
import React from 'react'

import { StackScreenProps } from '@react-navigation/stack'

import Button from '../../components/Button'
import { RootStackScreensParamList } from '../../navigators'

import styles from './styles'
import NavigationBar from '../../components/NavigationBar'

const HomeScreen: React.FC<HomeScreen> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <NavigationBar title='Mode Selection' />
      <View style={styles.buttonContainer}>
        <Button
          title='Single Player'
          onPress={() => navigation.navigate('Singleplayer')} />
        <Button
          title='MultiPlayer (Single Device)'
          onPress={() => navigation.navigate('MultiplayerSingleDevice')} />
        <Button
          title='MultiPlayer (Different Devices)'
          onPress={() => navigation.navigate('Multiplayer')} />
      </View>
    </View>
  )
}

export default HomeScreen

type HomeScreen = StackScreenProps<RootStackScreensParamList, 'Home'>
