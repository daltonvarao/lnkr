import React, { FormEvent, useState } from 'react'
import { useHistory } from 'react-router'
import Loader from '../../components/Loader'
import { useAlert } from '../../providers/alerts'
import api from '../../services/api'
import { ErrorMessage } from '../../styles/globals'

import { Color, ColorContainer, ColorGroup, ColorLabel, Container, Title } from './styles'

const colors = [
  '#ff4eff',
  '#9111ed',
  '#181849',
  '#4949fd',
  '#00fff2',
  '#36b37e',
  '#ffc400',
  '#ff8400',
  '#e94141',
]

const CreateTag: React.FC = () => {
  const [title, setTitle] = useState('')
  const [color, setColor] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const history = useHistory()
  const alert = useAlert()

  async function handleCreate(ev: FormEvent) {
    setLoading(true)
    ev.preventDefault()

    try {
      const { data } = await api.post('/tags', {
        title,
        color,
      })

      alert.push(data.message)
      setLoading(false)
      history.push('/tags')
    } catch (error) {
      setError(error.response.data.errors[0].message)
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Container>
      <Title>Nova Tag</Title>
      <form action="">
        <input
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          type="text"
          name="title"
          placeholder="Titulo"
        />

        <h4>Selecione a cor</h4>
        <ColorContainer>
          {colors.map((c) => {
            return (
              <ColorGroup key={c}>
                <Color
                  onChange={(ev) => setColor(ev.target.value)}
                  defaultChecked={c === color}
                  type="radio"
                  id={c}
                  value={c}
                  name="c"
                  color={c}
                />
                <ColorLabel style={{ background: c }} htmlFor={c} />
              </ColorGroup>
            )
          })}
        </ColorContainer>

        <ErrorMessage>{error}</ErrorMessage>

        <button
          title={title.length >= 2 && color ? 'Salvar' : 'Preencha os campos corretamente'}
          disabled={!(title && color)}
          className="primary block w-100"
          onClick={handleCreate}
        >
          Salvar
        </button>
      </form>
    </Container>
  )
}

export default CreateTag
