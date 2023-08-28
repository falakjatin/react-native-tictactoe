import { View, TouchableWithoutFeedback, Image, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import styles from './styles'
import { CONDITIONS } from '../../constants'

const CROSS_ICON = require('../../assets/images/cross.png')
const CIRCLE_ICON = require('../../assets/images/circle.png')

const Game = () => {

  const [userInputs, setUserInputs] = useState<number[]>([])
  const [opInputs, setOpInputs] = useState<number[]>([])
  const [result, setResult] = useState({ You: 0, Opponent: 0 })
  const [winner, setWinner] = useState<'You' | 'Opponent' | ''>('')

  useEffect(() => {
    // check if the user has lost or not
  }, [userInputs, opInputs])

  const AIAction = (currSelected: number[]) => {
    const winner = decideWinner(currSelected)
    console.log(winner)
    if (winner !== '') {
      setWinner(winner)
      return
    }
    while (true) {
      const inputs = currSelected.concat(opInputs)
      const randomNumber = Math.round(Math.random() * 8.3)
      if (inputs.every(d => d !== randomNumber)) {
        setOpInputs(opInputs.concat(randomNumber))
        break
      }
    }
  }

  const decideWinner = (currSelected: number[]) => {
    let decision: '' | 'You' | 'Opponent' = ''
    for (let i = 0; i < CONDITIONS.length; i++) {
      if (CONDITIONS[i].every(a => currSelected.includes(a))) {
        decision = 'You'
        break
      }
      if (CONDITIONS[i].every(a => opInputs.includes(a))) {
        decision = 'Opponent'
        break
      }
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
          disabled={(userInputs.includes(i) || opInputs.includes(i)) && !!winner}>
          <View style={styles.cubes}>
            {(userInputs.includes(i) || opInputs.includes(i)) && <Image
              style={styles.icons}
              source={userInputs.includes(i) ? CIRCLE_ICON : CROSS_ICON} />}
          </View>
        </TouchableWithoutFeedback>)}
      </View>
      <View style={styles.resultContainer}>
        {winner === 'You' && <Text>Congratulation!</Text>}
        {winner && <Text>{winner + ' won the game.'}</Text>}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={resetGame}>
          <Text style={styles.btnText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Game

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8]