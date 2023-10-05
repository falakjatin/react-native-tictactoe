import { View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { NetworkInfo } from 'react-native-network-info'
import { StackScreenProps } from '@react-navigation/stack'

import Button from '../../components/Button'
import NavigationBar from '../../components/NavigationBar'
import { RootStackScreensParamList } from '../../navigators'

import global from '../../styles/global'

const HomeScreen: React.FC<HomeScreen> = ({ navigation }) => {

  const [ip, setIp] = useState('')

  useEffect(() => {
    fetchIpAddress()
  }, [])

  const fetchIpAddress = async () => {
    const ip = await NetworkInfo.getIPV4Address();
    if (ip)
      setIp(ip);
  }

  return (
    <View style={global.container}>
      <NavigationBar title='Mode Selection' />
      <View style={global.buttonContainer}>
        <Button
          title='Single Player'
          onPress={() => navigation.navigate('Singleplayer', { ip })} />
        <Button
          title='MultiPlayer (Single Device)'
          onPress={() => navigation.navigate('MultiplayerSingleDevice', { ip })} />
        <Button
          title='MultiPlayer (Different Devices)'
          onPress={() => navigation.navigate('Multiplayer', { ip })} />
      </View>
    </View>
  )
}

export default HomeScreen

type HomeScreen = StackScreenProps<RootStackScreensParamList, 'Home'>
