import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'

import { useAlert } from '../../providers/alerts'
import { ErrorMessage } from '../../styles/globals'
import { Container, Title } from './styles'
import api from '../../services/api'
import Loader from '../../components/Loader'
import MultiSelect from '../../components/MultiSelect'

interface Categoria {
  id: number
  title: string
  color: string
}

interface Link {
  id: number
  title: string
  description: string
  url: string

  tags: Categoria[]
}

const EditLink: React.FC = () => {
  const [tags, setTags] = useState<Categoria[]>([])

  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const history = useHistory()
  const location = useLocation<{ link: Link }>()
  const params = useParams<{ id: string }>()
  const alert = useAlert()

  async function handleEditLink(ev: FormEvent) {
    ev.preventDefault()
    setLoading(true)

    if (!(title && description && url && tags)) return

    const linkData = {
      title,
      description,
      url,
      tagIds: tags.map(({ id }) => id),
    }

    try {
      const { data } = await api.put(`/links/${params.id}`, linkData)
      alert.push(data.message)
      setLoading(false)
      history.push('/')
    } catch (err) {
      setError(err.response.data.errors[0].message)
      console.log(err.toJSON())
      setLoading(false)
    }
  }

  const fillLinkData = useCallback((link: Link) => {
    setTitle(link.title)
    setDescription(link.description)
    setUrl(link.url)
    setTags(link.tags)
  }, [])

  const loadLink = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get(`/links/${params.id}`)
      fillLinkData(data.link)
      setLoading(false)
    } catch (error) {
      history.push('/')
    }
  }, [])

  useEffect(() => {
    const link = location.state?.link

    if (link) {
      fillLinkData(link)
    } else if (params.id) {
      loadLink()
    }
  }, [location.state])

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
      <Title>Editar Link</Title>
      <form action="">
        <input
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

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <button
          disabled={loading || !(title && description && url && tags.length)}
          onClick={handleEditLink}
          className="primary flex align-items-center justify-content-center w-100"
        >
          Salvar &nbsp;
          {loading && <Loader color="#fff" size={20} inline />}
        </button>
      </form>
    </Container>
  )
}

export default EditLink
