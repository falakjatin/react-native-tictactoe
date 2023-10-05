import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
} from 'react-native'

import UdpSocket from 'react-native-udp';
import UdpSocketType from 'react-native-udp/lib/types/UdpSocket'

import Button from '../Button'

import { CONDITIONS } from '../../constants'

import styles from './styles'

const CROSS_ICON = require('../../assets/images/cross.png')
const CIRCLE_ICON = require('../../assets/images/circle.png')
const PORT = 8888

const Game: React.FC<Game> = ({ type, clientIp, hostIp }) => {

  const socketRef = useRef<UdpSocketType | null>(null)
  const inputsRef = useRef<inputsState>({ circleInputs: [], crossInputs: [] })

  const [inputs, setInputsSteps] = useState<inputsState>({ circleInputs: [], crossInputs: [] })
  const [result, setResult] = useState({ Circle: 0, Cross: 0, Draw: 0 })
  const [winner, setWinner] = useState<DecisionType>('')

  useEffect(() => {
    socketRef.current = UdpSocket.createSocket({ type: 'udp4', debug: true })

    socketRef.current.on('message', socketOnMessage)
    socketRef.current?.bind(PORT);

    return () => {
      socketRef.current?.close(() => console.info('-- SOCKET CLOSED --'));
    };
  }, [])

  const setInputs = (inputs: inputsState) => {
    console.log(inputs)
    inputsRef.current = inputs;
    setInputsSteps(inputs)
  };

  const socketOnMessage = (data: string, rinfo: any) => {
    const parsed = data.toString()
    if (rinfo?.address === clientIp || rinfo?.address === hostIp) {
      if (parsed === 'RESET') {
        resetGame()
      } else {
        gameAction(parseInt(parsed))
      }
    } else {
      if (!parsed.includes('Room Unavailable'))
        sendMsgToSocket({ msg: 'Room Unavailable -- ' + rinfo?.address, ip: rinfo?.address })
    }
  }

  const sendMsgToSocket = ({ msg, ip, port = PORT }: sendMsgToSocketType) => {
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

  const gameAction = (currStep: number) => {
    const circleInputs = [...inputsRef.current.circleInputs]
    const crossInputs = [...inputsRef.current.crossInputs]
    const isCircle = (circleInputs.length + crossInputs.length) % 2 === 0

    if (isCircle) {
      circleInputs.push(currStep)
      setInputs({ circleInputs, crossInputs })
    }
    let winner = decideWinner(circleInputs, crossInputs)
    if (winner !== '') {
      setWinner(winner)
    } else {
      if (type === 'singleplayer') {
        while (true) {
          const inputs = circleInputs.concat(crossInputs)
          const randomNumber = Math.round(Math.random() * 8.3)
          if (inputs.every(d => d !== randomNumber)) {
            crossInputs.push(randomNumber)
            break
          }
        }
      } else {
        if (!isCircle) {
          crossInputs.push(currStep)
        }
      }
      setInputs({ circleInputs, crossInputs })
      winner = decideWinner(circleInputs, crossInputs)
      if (winner !== '') {
        setWinner(winner)
      }
    }
  }

  const decideWinner = (circleInputs: number[], crossInputs: number[]) => {
    let decision: DecisionType = ''
    for (let i = 0; i < CONDITIONS.length; i++) {
      if (CONDITIONS[i].every(a => circleInputs.includes(a))) {
        decision = 'Circle'
        break
      }
      if (CONDITIONS[i].every(a => crossInputs.includes(a))) {
        decision = 'Cross'
        break
      }
    }
    if (((circleInputs.length + crossInputs.length) === 9) && !decision) {
      decision = 'Draw'
    }
    setResult((result) => (decision ? { ...result, [decision]: result[decision] + 1 } : result))

    return decision
  }

  const resetGame = () => {
    setWinner('')
    setInputs({ crossInputs: [], circleInputs: [] })
  }

  const onPressTile = (tileNum: number) => {
    sendMsgToSocket({
      msg: `${tileNum}`,
      ip: hostIp,
    })
    if (type === 'multiplayer') {
      gameAction(tileNum)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <View style={styles.scoreWrap}>
          <Image
            style={styles.scoreIcon}
            source={CIRCLE_ICON} />
          <Text style={styles.scoreText}>Circle: {result.Circle}</Text>
        </View>
        <View style={styles.scoreWrap}>
          <Image
            style={styles.scoreIcon}
            source={CROSS_ICON} />
          <Text style={styles.scoreText}>Cross: {result.Cross}</Text>
        </View>
      </View>
      <View style={styles.cubeContainer}>
        {numbers.map((i) => <TouchableWithoutFeedback
          key={i}
          onPress={() => onPressTile(i)}
          disabled={(inputs.circleInputs.includes(i) || inputs.crossInputs.includes(i)) || !!winner}>
          <View style={styles.cubes}>
            {(inputs.circleInputs.includes(i) || inputs.crossInputs.includes(i)) && <Image
              style={styles.icons}
              source={inputs.circleInputs.includes(i) ? CIRCLE_ICON : CROSS_ICON} />}
          </View>
        </TouchableWithoutFeedback>)}
      </View>
      <View style={styles.resultContainer}>
        <View style={styles.winText}>
          {winner === 'Circle' && <Text style={styles.congratText}>Congratulation!</Text>}
          {(winner === 'Cross' || winner === 'Circle') && <Text style={styles.winDescText}>{winner + ' won the game.'}</Text>}
          {winner === 'Draw' && <Text style={styles.winDescText}>{'Game ' + winner}</Text>}
        </View>
        <Button
          title='RESET'
          onPress={() => {
            sendMsgToSocket({ msg: 'RESET', ip: hostIp })
            sendMsgToSocket({ msg: 'RESET', ip: clientIp })
          }} />
      </View>
    </View>
  )
}

export default Game

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8]

type DecisionType = '' | 'Cross' | 'Circle' | 'Draw'

interface Game {
  type: 'singleplayer' | 'singledevice' | 'multiplayer',
  hostIp: string,
  clientIp: string,
}

interface sendMsgToSocketType {
  msg: string,
  port?: number,
  ip: string,
}

interface inputsState {
  crossInputs: number[],
  circleInputs: number[],
}
