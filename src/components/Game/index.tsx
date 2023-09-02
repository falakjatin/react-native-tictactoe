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

const Game: React.FC<Game> = ({ type = 'singledevice', clientIp, hostIp }) => {

  const socketRef = useRef<UdpSocketType | null>(null)

  const [userInputs, setUserInputs] = useState<number[]>([])
  const [opInputs, setOpInputs] = useState<number[]>([])
  const [result, setResult] = useState({ You: 0, Opponent: 0, Draw: 0 })
  const [winner, setWinner] = useState<DecisionType>('')

  useEffect(() => {
    socketRef.current = UdpSocket.createSocket({ type: 'udp4', debug: true })

    socketRef.current.on('message', socketOnMessage)
    socketRef.current?.bind(PORT);

    return () => {
      socketRef.current?.close(() => console.info('-- SOCKET CLOSED --'));
    };
  }, [])

  const socketOnMessage = (data: string, rinfo: any) => {
    const parsed: payloadType = JSON.parse(data)
    if (rinfo?.address === clientIp || rinfo?.address === hostIp) {
      if (parsed.msg === 'RESET') {
        resetGame()
      } else {
        gameAction(parseInt(parsed.msg))
      }
    } else {
      if (!data.includes('Room Unavailable'))
        sendMsgToSocket({ msg: 'Room Unavailable -- ' + rinfo?.address, ip: rinfo?.address })
    }
  }

  const sendMsgToSocket = ({ msg, ip, port = PORT }: sendMsgToSocketType) => {
    console.log(msg)
    socketRef.current?.send(
      JSON.stringify(msg),
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

    // GO TO FOR THE SOLUTION
    // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559

    console.log('userInputs.length --  ', userInputs, userInputs.length)
    console.log('opInputs.length --  ', opInputs, opInputs.length)
    const isCircle = (userInputs.length + opInputs.length) % 2 === 0
    console.log('isCircle -- ', isCircle)
    const userSteps = [...userInputs]
    const opSteps = [...opInputs]
    if (isCircle) {
      userSteps.push(currStep)
      setUserInputs(userSteps)
    }
    let winner = decideWinner(userSteps, opSteps)
    if (winner !== '') {
      setWinner(winner)
    }
    if (!winner) {
      switch (type) {
        case 'singleplayer':
          while (true) {
            const inputs = userSteps.concat(opSteps)
            const randomNumber = Math.round(Math.random() * 8.3)
            if (inputs.every(d => d !== randomNumber)) {
              opSteps.push(randomNumber)
              setOpInputs(opSteps)
              break
            }
          }
          break;

        case 'singledevice':
          if (!isCircle) {
            opSteps.push(currStep)
            setOpInputs(opSteps)
          }
          break;

        default:
          console.log('default called')
          break;
      }
    }

    winner = decideWinner(userSteps, opSteps)
    if (winner !== '') {
      setWinner(winner)
    }
  }

  const decideWinner = (userInputs: number[], opInputs: number[]) => {
    let decision: DecisionType = ''
    for (let i = 0; i < CONDITIONS.length; i++) {
      if (CONDITIONS[i].every(a => userInputs.includes(a))) {
        decision = 'You'
        break
      }
      if (CONDITIONS[i].every(a => opInputs.includes(a))) {
        decision = 'Opponent'
        break
      }
    }
    if (((userInputs.length + opInputs.length) === 9) && !decision) {
      decision = 'Draw'
    }
    if (decision)
      setResult({ ...result, [decision]: result[decision] + 1 })

    return decision
  }

  const resetGame = () => {
    console.log('line no 141')
    setUserInputs([])
    setOpInputs([])
    setWinner('')
  }

  return (
    <View style={styles.container}>
      <Text>YOU: {result.You}</Text>
      <Text>Opponent: {result.Opponent}</Text>
      <View style={styles.cubeContainer}>
        {numbers.map((i) => <TouchableWithoutFeedback
          key={i}
          onPress={() => sendMsgToSocket({
            msg: {
              type: 'gamemove',
              msg: i,
            },
            ip: hostIp
          })}
          disabled={(userInputs.includes(i) || opInputs.includes(i)) || !!winner}>
          <View style={styles.cubes}>
            {(userInputs.includes(i) || opInputs.includes(i)) && <Image
              style={styles.icons}
              source={userInputs.includes(i) ? CIRCLE_ICON : CROSS_ICON} />}
          </View>
        </TouchableWithoutFeedback>)}
      </View>
      <View style={styles.resultContainer}>
        {winner === 'You' && <Text>Congratulation!</Text>}
        {(winner === 'Opponent' || winner === 'You') && <Text>{winner + ' won the game.'}</Text>}
        {winner === 'Draw' && <Text>{'Game ' + winner}</Text>}
        <Button title='RESET' onPress={() => sendMsgToSocket({
          msg: { msg: 'RESET' },
          ip: hostIp
        })} />
      </View>
    </View>
  )
}

export default Game

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8]

type DecisionType = '' | 'Opponent' | 'You' | 'Draw' | ''

interface Game {
  type?: 'singleplayer' | 'singledevice' | 'multiplayer',
  hostIp: string,
  clientIp: string,
}

interface payloadType {
  type: 'joinrequest' | 'gamemove',
  msg: string,
}

interface sendMsgToSocketType {
  msg: any,
  port?: number,
  ip: string,
}