import React, { FormEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import { useAlert } from '../../providers/alerts'
import { ErrorMessage } from '../../styles/globals'
import { Container, FormGroup, Title } from './styles'
import api from '../../services/api'
import Loader from '../../components/Loader'
import MultiSelect from '../../components/MultiSelect'
import Switch from '../../components/Switch'

interface Categoria {
  id: number
  title: string
  color: string
}

const CreateLink: React.FC = () => {
  const [tags, setTags] = useState<Categoria[]>([])

  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [short, setShort] = useState(false)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const alert = useAlert()

  async function handleCreateLink(ev: FormEvent) {
    ev.preventDefault()
    setLoading(true)

    if (!(title && description && url && tags)) return

    const linkData = {
      title,
      description,
      url,
      short,
      tagIds: tags.map(({ id }) => id),
    }

    try {
      const { data } = await api.post('/links', linkData)
      alert.push(data.message)
      setLoading(false)
      history.push('/')
    } catch (err) {
      setError(err.response.data.errors[0].message)
      console.log(err.toJSON())
      setLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.get('/tags')
        setCategorias(data.tags)
      } catch (error) {}
    })()
  }, [])

  return (
    <Container>
      <Title>Novo Link</Title>
      <form action="">
        <input
          name="titulo"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          type="text"
          placeholder="Titulo"
        />
        <textarea
          onChange={(ev) => setDescription(ev.target.value)}
          placeholder="Descrição"
          value={description}
          rows={5}
        ></textarea>
        <input
          type="text"
          value={url}
          onChange={(ev) => setUrl(ev.target.value)}
          placeholder="Url"
        />

        <MultiSelect
          name="categorias"
          inputId="categorias"
          collection={categorias}
          labelKey="title"
          selectedItems={tags}
          onSelect={(item: Categoria) => {
            const newState = [...tags, item]

            setTags(newState)
          }}
          onRemove={(index) => {
            const newState = [...tags]
            newState.splice(index, 1)

            setTags(newState)
          }}
        />

        <FormGroup>
          <Switch
            id="encurtar"
            checked={short}
            onChange={(ev) => {
              setShort(ev.target.checked)
            }}
          />
          <label htmlFor="encurtar">Encurtar</label>
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <button
          disabled={loading || !(title && description && url && tags.length)}
          onClick={handleCreateLink}
          className="primary flex align-items-center justify-content-center w-100 mt-1"
        >
          Salvar &nbsp;
          {loading && <Loader color="#fff" size={20} inline />}
        </button>
      </form>
    </Container>
  )
}

export default CreateLink
