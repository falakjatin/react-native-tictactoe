import React from 'react'
import { View, Text, TextInputProps, TextInput } from 'react-native'

import styles from './styles'

const Input: React.FC<Input> = ({
  title = '',
  value,
  onChangeText,
  error,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, error && styles.error]}>{title}</Text>
      <TextInput
        style={[styles.text, styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText} />
    </View>
  )
}

export default Input

interface Input extends TextInputProps {
  title: string,
  error: boolean,
}