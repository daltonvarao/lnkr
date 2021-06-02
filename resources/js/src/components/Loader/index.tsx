import React from 'react'
import colors from '../../styles/colors'

import { ActivityIndicator, Container, LoaderMessage } from './styles'

interface LoaderProps extends Partial<HTMLDivElement> {
  message?: string
  size?: number
  inline?: boolean
  color?: string
}

const Loader: React.FC<LoaderProps> = ({
  message,
  inline = false,
  size,
  color = colors.primary,
}) => {
  return (
    <Container inline={inline}>
      <ActivityIndicator size={size} color={color} />

      {message && <LoaderMessage>{message}</LoaderMessage>}
    </Container>
  )
}

export default Loader
