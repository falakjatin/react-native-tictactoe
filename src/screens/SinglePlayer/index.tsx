import { StyleSheet, View } from 'react-native'
import React from 'react'

import { StackScreenProps } from '@react-navigation/stack'

import Game from '../../components/Game'
import NavigationBar from '../../components/NavigationBar'
import { RootStackScreensParamList } from '../../navigators'

import global from '../../styles/global'

const SinglePlayerScreen: React.FC<SinglePlayerScreen> = ({
  navigation,
  route: { params: { ip } },
}) => {
  return (
    <View style={global.container}>
      <NavigationBar onRightSidePress={() => navigation.goBack()} />
      <Game
        type='singleplayer'
        clientIp={ip}
        hostIp={ip} />
    </View>
  )
}

export default SinglePlayerScreen

type SinglePlayerScreen = StackScreenProps<RootStackScreensParamList, 'Singleplayer'>
