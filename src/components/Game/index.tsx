import React, { useState } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
} from 'react-native'

import Button from '../Button'

import { CONDITIONS } from '../../constants'

import styles from './styles'

const CROSS_ICON = require('../../assets/images/cross.png')
const CIRCLE_ICON = require('../../assets/images/circle.png')

const Game: React.FC<Game> = ({ type = 'singledevice' }) => {

  const [userInputs, setUserInputs] = useState<number[]>([])
  const [opInputs, setOpInputs] = useState<number[]>([])
  const [result, setResult] = useState({ You: 0, Opponent: 0, Draw: 0 })
  const [winner, setWinner] = useState<DecisionType>('')

  const gameAction = (currStep: number) => {
    const isCircle = (userInputs.length + opInputs.length) % 2 === 0
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
          onPress={() => gameAction(i)}
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
        <Button title='RESET' onPress={resetGame} />
      </View>
    </View>
  )
}

export default Game

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8]

type DecisionType = '' | 'Opponent' | 'You' | 'Draw' | ''

interface Game {
  type: 'singleplayer' | 'singledevice' | 'multiplayer'
}