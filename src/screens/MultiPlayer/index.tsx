import React, { useState } from 'react'
import { Text, View } from 'react-native'

import { StackScreenProps } from '@react-navigation/stack'
import { RootStackScreensParamList } from '../../navigators'

import Game from '../../components/Game'
import NavigationBar from '../../components/NavigationBar'

import global from '../../styles/global'
import Input from '../../components/Input'
import Button from '../../components/Button'

const MultiPlayerScreen: React.FC<MultiPlayerScreen> = ({
  navigation,
  route: { params: { ip } },
}) => {

  const [hostIp, setHostIp] = useState('')
  const [error, setError] = useState(false)
  const [startGame, setStartGame] = useState(false)

  const validate = () => {
    if (!hostIp || isNaN(parseFloat(hostIp.replaceAll('.', '')))) {
      setError(true)
    } else {
      setStartGame(true)
    }
  }

  return (
    <View style={global.container}>
      <NavigationBar onRightSidePress={() => navigation.goBack()} />
      <Text>{ip}</Text>
      {startGame ? <Game
        clientIp={ip}
        hostIp={hostIp}
        type='multiplayer' />
        : <View style={global.multiplayerContainer}>
          <Input title='Enter IP' value={hostIp} onChangeText={setHostIp} error={error} />
          <Button title='Connect' onPress={validate} />
        </View>}
    </View>
  )
}

export default MultiPlayerScreen

type MultiPlayerScreen = StackScreenProps<RootStackScreensParamList, 'Multiplayer'>
