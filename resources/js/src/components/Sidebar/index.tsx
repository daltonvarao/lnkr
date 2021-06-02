import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import * as Fi from 'react-icons/fi'

import { Container, LogoutButton, Navigation, Title } from './styles'
import { AuthContext } from '../../providers/auth'

interface LinkProps {
  to: string
  exact?: boolean
}

const Link: React.FC<LinkProps> = ({ to, children, exact }) => (
  <NavLink exact={exact} activeClassName="active" to={to}>
    {children}
  </NavLink>
)

const Sidebar: React.FC = () => {
  const auth = useContext(AuthContext)

  if (!auth.isLoggedIn) {
    return null
  }

  const scrollIndicator = (ev: React.MouseEvent) => {
    const target = ev.target as Element
    const menu = document.querySelector('ul#menu')

    if (!menu) return
    const li = menu.querySelector('li')
    const active = menu.querySelector('#active-item') as HTMLElement

    if (!(li && active)) return
    const menuRect = menu.getBoundingClientRect()

    const liRect = li.getBoundingClientRect()
    const currentItemRect = target.getBoundingClientRect()

    const currentItem = Math.floor((currentItemRect.top - menuRect.top) / liRect.height)

    active.style.top = String(currentItem * liRect.height).concat('px')
    active.style.height = String(liRect.height).concat('px')
  }

  return (
    <Container>
      <Title>Lnkr</Title>
      <Navigation>
        <ul id="menu">
          <div id="active-item"></div>
          <li onClick={scrollIndicator}>
            <Link to="/" exact>
              <Fi.FiHome size={28} />
            </Link>
          </li>
          <li onClick={scrollIndicator} title="Novo link">
            <Link to="/links/create">
              <Fi.FiExternalLink size={28} />
            </Link>
          </li>
          <li onClick={scrollIndicator} title="Tags">
            <Link to="/tags">
              <Fi.FiTag size={28} />
            </Link>
          </li>
          <li onClick={scrollIndicator} title="Perfil">
            <Link to="/profile">
              <Fi.FiUser size={28} />
            </Link>
          </li>
        </ul>
      </Navigation>
      <LogoutButton onClick={auth.logout}>
        <Fi.FiLogOut size={28} />
      </LogoutButton>
    </Container>
  )
}

export default Sidebar
