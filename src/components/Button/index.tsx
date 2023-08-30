import React from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  TextProps,
} from 'react-native'

import Utils from '../../utils'

const Button: React.FC<Button> = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={0.7}
      onPress={onPress}>
      <Text style={[styles.btnText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1d4ed8',
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
    paddingVertical: Utils.manageWidthPer(2.8),
    marginVertical: Utils.manageWidthPer(2),
  },
  btnText: {
    color: '#fff',
    fontSize: Utils.manageWidthPer(4),
    fontWeight: '500',
  },
})

interface Button extends TouchableOpacityProps {
  title: string,
  textStyle?: StyleProp<TextProps>
}