import React, { useEffect, useRef, useState } from 'react'
import { Text, SafeAreaView, Button, TextInput, Alert, AppState } from 'react-native'
import { NetworkInfo } from 'react-native-network-info'
import UdpSocketType from 'react-native-udp/lib/types/UdpSocket'
import UdpSocket from 'react-native-udp';

const App = () => {

  const socketRef = useRef<UdpSocketType | null>(null)

  const [isHost, setIsHost] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [ipAddress, setIpAddress] = useState('')
  const [clientIp, setClientIp] = useState('')
  const [hostIp, setHostIp] = useState('192.168.0.30')

  useEffect(() => {
    socketRef.current = UdpSocket.createSocket({ type: 'udp4', debug: true })

    fetchIpAddress()
    if (isHost) {
      socketRef.current?.on('message', (data, rinfo) => {
        const parsed: payloadType = JSON.parse(data)
        console.log(JSON.parse(data))
        if (parsed.type === 'joinrequest')
          setClientIp(rinfo?.address)
        if (parsed.type === 'gamemove') {
          console.log('player selected ' + parsed.msg)
        }
        if (clientIp) {
          sendMsgToSocket({ msg: 'Room Unavailable', ip: rinfo?.address, port: 8887 })
        }
        console.info('SERVER -- Message received:', data.toString());
      });

      socketRef.current?.on('listening', () => {
        console.info('SERVER -- listening on port:', socketRef.current?.address().port);
      });
      socketRef.current?.bind(8888);
    } else {
      socketRef.current?.on('message', (data, rinfo) => {
        if (rinfo?.address === hostIp) {
          console.info('CLIENT -- Message received:', data.toString());
        } else {

        }
      });
      socketRef.current?.bind(8887);
    }

    return () => {
      setClientIp('')
      socketRef.current?.close(() => console.info('-- SOCKET CLOSED --'));
    };
  }, [isHost])

  const fetchIpAddress = async () => {
    const ip = await NetworkInfo.getIPV4Address();
    if (ip)
      setIpAddress(ip);
  }

  const sendMsgToSocket = ({ msg, ip, port }: sendMsgToSocketType) => {
    socketRef.current?.send(
      msg,
      undefined,
      undefined,
      port,
      ip,
      (error) => {
        if (error) {
          console.error(`${ip}:${port} -- Error sending message:`, error);
        } else {
          console.info(`${ip}:${port} -- Message sent successfully`);
        }
      });
  }

  const joinHost = () => {
    if (hostIp) {
      setIsClient(true)
      sendMsgToSocket({
        msg: JSON.stringify({ type: 'joinrequest', msg: '' }),
        ip: hostIp,
        port: 8888,
      })
    } else {
      Alert.alert('Please enter a valid IP address')
    }
  }

  const disconnectHost = () => {
    setIsClient(false)
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title={isHost ? 'Stop hosting' : 'Host the game'}
        onPress={() => setIsHost(!isHost)} />
      {!isHost && <>
        <TextInput
          onChangeText={setHostIp}
          value={hostIp}
          style={{ borderWidth: 1, width: '60%', padding: 5 }} />
        <Button
          title='Join the game'
          onPress={joinHost} />
        {isClient && <Button
          title='Disconnect the game'
          onPress={disconnectHost} />}
      </>}
      {isHost && <Text>{'Join on: ' + ipAddress}</Text>}
    </SafeAreaView>
  )
}

export default App

interface sendMsgToSocketType {
  msg: string,
  port: number,
  ip: string,
}

interface payloadType {
  type: 'joinrequest' | 'gamemove',
  msg: string,
}