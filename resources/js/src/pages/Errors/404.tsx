import React from 'react'
import { Link } from 'react-router-dom'

import { Code, Container, ErrorMessage } from './styles'

const Error404 = () => {
  return (
    <Container>
      <Code>404</Code>

      <h2>Whoops, nothing here!</h2>

      <ErrorMessage>The page you're looking for is not found! :( </ErrorMessage>

      <Link to="/">Back to Home</Link>
    </Container>
  )
}

export default Error404
