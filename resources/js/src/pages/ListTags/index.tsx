import React, { useCallback, useContext, useEffect, useState } from 'react'

import * as Fi from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import { useAlert } from '../../providers/alerts'
import api from '../../services/api'

import {
  Container,
  ListContainer,
  ItemContainer,
  HeaderContainer,
  ItemHeader,
  ItemTitle,
  FooterAction,
  FooterActions,
} from './styles'

interface Tag {
  title: string
  color: string
  id: number
}

const ListTags: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingIndex, setDeletingIndex] = useState<null | number>(null)

  const alert = useAlert()

  async function deleteTag(id: number, index: number) {
    const wantsDelete = confirm('Este item será deletado permantemente, continuar?')

    if (!wantsDelete) return

    setDeletingIndex(index)

    try {
      const { data } = await api.delete(`/tags/${id}`)
      alert.push(data.message)

      const newState = [...tags]
      newState.splice(index, 1)
      setTags(newState)
    } catch (error) {
      console.log(error.toJSON())
    }

    setDeletingIndex(null)
  }

  const loadTags = useCallback(async () => {
    try {
      const { data } = await api.get('/tags')

      setTags(data.tags)
    } catch (error) {}

    setLoading(false)
  }, [])

  useEffect(() => {
    loadTags()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <Container>
      <HeaderContainer>
        <h2>Categorias</h2>
        <Link to="/tags/create">
          Nova
          <Fi.FiPlus />
        </Link>
      </HeaderContainer>

      <ListContainer>
        {tags.map((tag, index) => {
          return (
            <ItemContainer key={tag.id} color={tag.color}>
              <ItemHeader>
                <ItemTitle>{tag.title}</ItemTitle>
              </ItemHeader>

              <FooterActions>
                <FooterAction onClick={() => deleteTag(tag.id, index)} color="tomato">
                  {deletingIndex === index ? <Loader size={20} color="tomato" /> : <Fi.FiTrash2 />}
                </FooterAction>
                <Link to={{ pathname: `/tags/edit/${tag.id}`, state: { tag } }} color="steelblue">
                  <Fi.FiEdit />
                </Link>
              </FooterActions>
            </ItemContainer>
          )
        })}
      </ListContainer>
    </Container>
  )
}

export default ListTags
