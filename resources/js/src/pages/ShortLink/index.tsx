import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import Loader from '../../components/Loader'
import api from '../../services/api'

import { Container } from './styles'

const ShortLink: React.FC = () => {
  const params = useParams<{ short_id: string }>()

  useEffect(() => {
    async function loadLink() {
      try {
        const response = await api.get(`/short-links/${params.short_id}`)

        window.location.href = response.data.link.url
      } catch (error) {
        console.log(error)
      }
    }

    loadLink()
  }, [])

  return (
    <Container>
      <Loader size={28} message="Você será redirecionado em instantes!" />
    </Container>
  )
}

export default ShortLink
