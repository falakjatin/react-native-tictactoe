import React from 'react'
import { View } from 'react-native'

import Game from '../../components/Game'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackScreensParamList } from '../../navigators'
import NavigationBar from '../../components/NavigationBar'

import global from '../../styles/global'

const MultiPlayerSingleDeviceScreen: React.FC<MultiPlayerSingleDeviceScreen> = ({
  navigation,
  route: { params: { ip } },
}) => {
  return (
    <View style={global.container}>
      <NavigationBar onRightSidePress={() => navigation.goBack()} />
      <Game
        clientIp={ip}
        hostIp={ip}
        type='singledevice' />
    </View>
  )
}

export default MultiPlayerSingleDeviceScreen

type MultiPlayerSingleDeviceScreen = StackScreenProps<RootStackScreensParamList, 'MultiplayerSingleDevice'>
