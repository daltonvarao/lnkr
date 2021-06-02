import React, { createRef, useCallback, useEffect, useState } from 'react'
import {
  ActionsContainer,
  Container,
  Content,
  ContentContainer,
  ContentDescription,
  ContentHeader,
  AnchorLink,
  ContentTag,
  ContentTags,
  ContentTitle,
  ButtonLink,
  Input,
  InputContainer,
  Label,
  Loading,
  SearchBy,
  SearchByContainer,
  SearchByGroup,
  SearchContainer,
} from './styles'

import * as Fi from 'react-icons/fi'
import * as Hi from 'react-icons/hi'
import api from '../../services/api'
import ShowQRCode from '../../components/ShowQRCode'
import colors from '../../styles/colors'
import Loader from '../../components/Loader'
import { useAlert } from '../../providers/alerts'
import { Link } from 'react-router-dom'

interface Tag {
  title: string
  color: string
  id: number
}

interface LinkProps {
  title: string
  description: string
  url: string
  tags: Tag[]
  id: number
}

const Home: React.FC = () => {
  const searchRef = createRef<HTMLInputElement>()
  const [results, setResults] = useState<LinkProps[]>([])
  const [searchBy, setSearchBy] = useState('title')
  const [loading, setLoading] = useState(false)

  const [deletingIndex, setDeletingIndex] = useState<null | number>()
  const [copiedIds, setCopiedIds] = useState<number[]>([])
  const alert = useAlert()

  function copytoClipboard(result: LinkProps) {
    navigator.clipboard.writeText(result.url)

    setCopiedIds((state) => [...state, result.id])

    setTimeout(() => {
      setCopiedIds((state) => {
        const newState = [...state]

        newState.splice(newState.indexOf(result.id), 1)

        return newState
      })
    }, 4000)
  }

  async function handleRemove(id: number, index: number) {
    const wantsDelete = confirm('Este item será removido permanentemente, continuar?')

    if (!wantsDelete) return

    try {
      setDeletingIndex(index)
      const { data } = await api.delete(`/links/${id}`)
      alert.push(data.message)
      const newState = [...results]
      newState.splice(index, 1)
      setResults(newState)
    } catch (error) {}

    setDeletingIndex(null)
  }

  const loadResults = useCallback(async (params?: any) => {
    setLoading(true)
    try {
      const { data } = await api.get('/links', { params })

      setResults(data.links)
    } catch (error) {}
    setLoading(false)
  }, [])

  useEffect(() => {
    loadResults()

    document.body.querySelector('.content')?.classList.add('home')

    return () => {
      document.body.querySelector('.content')?.classList.remove('home')
    }
  }, [])

  return (
    <Container>
      <SearchContainer>
        <InputContainer>
          <Fi.FiSearch />
          <Input
            onChange={(ev) => {
              loadResults({ [searchBy]: ev.target.value })
            }}
            ref={searchRef}
            placeholder="Search"
          />
          {loading && <Loading />}
        </InputContainer>

        <SearchByContainer>
          <SearchByGroup>
            <SearchBy
              onChange={(ev) => setSearchBy(ev.target.value)}
              defaultChecked
              type="radio"
              name="by"
              value="title"
              id="link"
            />
            <Label htmlFor="link">Link</Label>
          </SearchByGroup>

          <SearchByGroup>
            <SearchBy
              onChange={(ev) => setSearchBy(ev.target.value)}
              type="radio"
              name="by"
              value="tag"
              id="tag"
            />
            <Label htmlFor="tag">Tag</Label>
          </SearchByGroup>
        </SearchByContainer>
      </SearchContainer>

      <h2>Resultados</h2>

      <ContentContainer>
        {results.map((result, index) => {
          return (
            <Content key={result.id}>
              <ContentHeader>
                <ContentTitle>{result.title}</ContentTitle>
                <ShowQRCode value={result.url} />
              </ContentHeader>
              <ContentDescription>{result.description}</ContentDescription>

              <ContentTags>
                {result.tags.map((tag) => {
                  return (
                    <ContentTag key={tag.id} href="#" color={tag.color}>
                      {tag.title}
                    </ContentTag>
                  )
                })}
              </ContentTags>

              <ActionsContainer>
                <AnchorLink title="Abrir" href={result.url} target="_blank">
                  <Fi.FiExternalLink size={22} />
                </AnchorLink>

                <ButtonLink title="Copiar" onClick={() => copytoClipboard(result)}>
                  {copiedIds.includes(result.id) ? (
                    <Hi.HiOutlineClipboardCheck color={colors.success} size={22} />
                  ) : (
                    <Hi.HiOutlineClipboard size={22} />
                  )}
                </ButtonLink>

                <Link
                  title="Editar"
                  to={{
                    pathname: `/links/${result.id}/edit`,
                    state: {
                      link: result,
                    },
                  }}
                >
                  <Fi.FiEdit size={22} />
                </Link>
                {deletingIndex === index ? (
                  <Loader size={22} inline color="tomato" />
                ) : (
                  <ButtonLink
                    title="Remover"
                    style={{ color: 'tomato' }}
                    onClick={() => handleRemove(result.id, index)}
                  >
                    <Fi.FiTrash2 size={22} />
                  </ButtonLink>
                )}
              </ActionsContainer>
            </Content>
          )
        })}
      </ContentContainer>
    </Container>
  )
}

export default Home
