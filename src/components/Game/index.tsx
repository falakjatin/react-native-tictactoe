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

const Game = () => {

  const [userInputs, setUserInputs] = useState<number[]>([])
  const [opInputs, setOpInputs] = useState<number[]>([])
  const [result, setResult] = useState({ You: 0, Opponent: 0, Draw: 0 })
  const [winner, setWinner] = useState<DecisionType>('')

  const AIAction = (currSelected: number[]) => {
    const winner = decideWinner(currSelected, opInputs)
    if (winner !== '') {
      setWinner(winner)
      return
    }
    while (true) {
      const inputs = currSelected.concat(opInputs)
      const randomNumber = Math.round(Math.random() * 8.3)
      if (inputs.every(d => d !== randomNumber)) {
        const newSteps = opInputs.concat(randomNumber)
        setOpInputs(newSteps)
        const winner = decideWinner(currSelected, newSteps)
        if (winner !== '') {
          setWinner(winner)
        }
        break
      }
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
    return decision
  }

  const resetGame = () => {
    setUserInputs([])
    setOpInputs([])
    if (winner)
      setResult({ ...result, [winner]: result[winner] + 1 })
    setWinner('')
  }

  const opponentStep = (pos: number) => {
    if (!opInputs.includes(pos)) {
      setOpInputs([...opInputs, pos])
    }
  }

  const afterProceedingStep = (i: number) => {
    setUserInputs([...userInputs, i])
    AIAction([...userInputs, i])
  }

  return (
    <View style={styles.container}>
      <Text>YOU: {result.You}</Text>
      <Text>Opponent: {result.Opponent}</Text>
      <View style={styles.cubeContainer}>
        {numbers.map((i) => <TouchableWithoutFeedback
          key={i}
          onPress={() => afterProceedingStep(i)}
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
