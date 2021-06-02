import axios from 'axios'
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import { AuthContext } from '../../providers/auth'

import {
  Container,
  IllustrationContainer,
  FormContainer,
  RegisterLinkContainer,
  ErrorMessage,
} from './styles'

const Login: React.FC = () => {
  const auth = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [logging, setLogging] = useState(false)
  const [error, setError] = useState('')

  const history = useHistory()

  async function handleLogin(ev: FormEvent) {
    ev.preventDefault()

    setLogging(true)

    try {
      const response = await axios.post('/api/auth', { email, password })

      auth.authenticate(response.data.token)
    } catch (err) {
      if (err.response.data) {
        setError(err.response.data.errors[0].message)
      }
    }

    setLogging(false)
  }

  useEffect(() => {
    if (auth.isLoggedIn) {
      history.replace('/')
    }

    setLoading(false)
  }, [auth.isLoggedIn])

  if (loading) return <Loader />

  return (
    <Container>
      <FormContainer>
        {logging ? (
          <Loader />
        ) : (
          <React.Fragment>
            <h1>Login</h1>

            <input
              onChange={(ev) => setEmail(ev.target.value)}
              value={email}
              type="text"
              placeholder="Email"
              name="email"
            />
            <input
              onChange={(ev) => setPassword(ev.target.value)}
              value={password}
              type="password"
              placeholder="Senha"
            />

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <button disabled={!email || !password} onClick={handleLogin} className="primary w-100">
              Entrar
            </button>

            <RegisterLinkContainer>
              Não possui conta?
              <Link to="/register"> Registre-se aqui</Link>
            </RegisterLinkContainer>
          </React.Fragment>
        )}
      </FormContainer>
      <IllustrationContainer>
        <h1>Lnkr</h1>

        <p>Organize seus links e acesse onde e quando quiser.</p>
      </IllustrationContainer>
    </Container>
  )
}

export default Login
