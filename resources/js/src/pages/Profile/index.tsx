import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import {
  Container,
  ProfileContainer,
  ProfileHeader,
  ProfileInfoContainer,
  ProfileName,
  ProfilePic,
} from './styles'

interface User {
  name: string
  email: string
  initials: string
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User>()

  const loadUser = useCallback(async () => {
    try {
      const { data } = await api.get('/profile')
      setUser(data.user)
    } catch (error) {}
  }, [])

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <Container>
      <ProfileContainer>
        <ProfileHeader>
          <ProfilePic>{user?.initials}</ProfilePic>
          <ProfileName>{user?.name}</ProfileName>
        </ProfileHeader>

        <ProfileInfoContainer>
          <label htmlFor="name">Nome</label>
          <input id="name" type="text" placeholder="Nome" defaultValue={user?.name} />
          <label htmlFor="email">Email</label>
          <input id="email" type="text" placeholder="Nome" defaultValue={user?.email} />
          <button className="primary w-100">Salvar</button>

          <Link to="/reset-password">Redefinir Senha</Link>
        </ProfileInfoContainer>
      </ProfileContainer>
    </Container>
  )
}

export default Profile
