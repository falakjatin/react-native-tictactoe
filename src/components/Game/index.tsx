import { View, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState } from 'react'

import styles from './styles'

export const GAME_RESULT_NO = -1
export const GAME_RESULT_USER= 0
export const GAME_RESULT_AI =  1
export const GAME_RESULT_TIE = 2

const Game = () => {

  const [userInputs, setUserInputs] = useState([])
  const [aIInputs, setAIInputs] = useState([])
  const [result, setResult] = useState(-1)
  const [round, setRound] = useState(0)

  return (
    <View style={styles.container}>
      <View style={styles.cubeContainer}>
        <TouchableWithoutFeedback>
          <View style={styles.cubes}>
            <Image
              style={styles.icons}
              source={require('../../assets/images/circle.png')} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.cubes}>
            <Image
              style={styles.icons}
              source={require('../../assets/images/close.png')} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.cubes}>
            <Image
              style={styles.icons}
              source={require('../../assets/images/circle.png')} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.cubeContainer}>
        <TouchableWithoutFeedback>
          <View style={styles.cubes}>
            <Image
              style={styles.icons}
              source={require('../../assets/images/close.png')} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.cubes}>
            <Image
              style={styles.icons}
              source={require('../../assets/images/close.png')} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.cubes}>
            <Image
              style={styles.icons}
              source={require('../../assets/images/circle.png')} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.cubeContainer}>
        <TouchableWithoutFeedback>
          <View style={styles.cubes}>
            <Image
              style={styles.icons}
              source={require('../../assets/images/circle.png')} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.cubes}>
            <Image
              style={styles.icons}
              source={require('../../assets/images/close.png')} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.cubes}>
            <Image
              style={styles.icons}
              source={require('../../assets/images/circle.png')} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default Game

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8]