import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  Linking,
  TextProps,
} from 'react-native'
import { TextWithoutTranslation } from './Text'

export const A = ({
  href,
  style,
  textStyle,
  onPress,
  ...props
}: TouchableOpacityProps & {
  href?: string
  textStyle?: TextProps['style']
}) => {
  const onPressLink = onPress ?? (() => openURL(href))

  const children = props.children ? (
    typeof props.children === 'string' ? (
      <TextWithoutTranslation style={styles.text}>{props.children}</TextWithoutTranslation>
    ) : (
      props.children
    )
  ) : null

  return (
    <TouchableOpacity style={style} onPress={onPressLink}>
      {children}
    </TouchableOpacity>
  )
}

const openURL = (href, target = '_blank') => {
  let url = href
  if (!url.includes('https://')) {
    url = `https://${url}`
  }

  if (Platform.OS === 'web') {
    window.open(url, target)
    return
  }

  Linking.openURL(url)
}

const styles = StyleSheet.create({
  text: {
    color: '#0000EE',
    textDecorationLine: 'underline',
  },
})
