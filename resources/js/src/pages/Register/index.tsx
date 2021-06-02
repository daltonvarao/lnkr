import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Loader from '../../components/Loader'
import { AuthContext } from '../../providers/auth'
import { ErrorMessage } from '../Login/styles'

import { Container, IllustrationContainer, LoginLinkContainer, RegisterContainer } from './styles'

const Register: React.FC = () => {
  const auth = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const history = useHistory()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (auth.isLoggedIn) {
      history.replace('/')
    }

    setLoading(false)
  }, [auth.isLoggedIn])

  async function handleRegister() {
    try {
      setLoading(true)

      const response = await axios.post('/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })

      auth.authenticate(response.data.token)
    } catch (err) {
      if (err.response.data.errors) {
        setError(err.response.data.errors[0].message)
      }
    }

    setLoading(false)
  }

  return (
    <Container>
      <RegisterContainer>
        {loading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <h2>Registre-se agora</h2>
            <input
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              type="text"
              placeholder="Nome"
              name="name"
            />
            <input
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              type="text"
              placeholder="Email"
              name="email"
            />
            <input
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              type="password"
              placeholder="Senha"
            />
            <input
              value={passwordConfirmation}
              onChange={(ev) => setPasswordConfirmation(ev.target.value)}
              type="password"
              placeholder="Confirme a senha"
            />

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <button
              disabled={
                !(name && email && password.length >= 6 && passwordConfirmation.length >= 6)
              }
              onClick={handleRegister}
              className="primary w-100"
            >
              Salvar
            </button>
            <LoginLinkContainer>
              Já possui conta?
              <Link to="/login"> Entre agora</Link>
            </LoginLinkContainer>
          </React.Fragment>
        )}
      </RegisterContainer>
      <IllustrationContainer>
        <h1>Lnkr</h1>

        <p>Organize seus links e acesse onde e quando quiser.</p>
      </IllustrationContainer>
    </Container>
  )
}

export default Register
