import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { AuthContext } from './providers/auth'

import Sidebar from './components/Sidebar'

import Home from './pages/Home'
import CreateLink from './pages/CreateLink'
import CreateTag from './pages/CreateTag'
import EditTag from './pages/EditTag'
import ListTags from './pages/ListTags'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Error404 from './pages/Errors/404'
import Alerts from './components/Alerts'
import EditLink from './pages/EditLink'
import ShortLink from './pages/ShortLink'

interface ProtectedRouteProps {
  path: string
  component?: React.FC
  exact?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, ...rest }) => {
  const auth = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth.isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: location,
              },
            }}
          />
        )
      }}
    />
  )
}

const Routes = () => {
  const auth = useContext(AuthContext)

  return (
    <BrowserRouter>
      <React.Fragment>
        <Sidebar />
        <Alerts />
        <div className={auth.isLoggedIn ? 'content' : 'content-without-margin'}>
          <Switch>
            <ProtectedRoute path="/" exact>
              <Home />
            </ProtectedRoute>
            <ProtectedRoute path="/links/create">
              <CreateLink />
            </ProtectedRoute>
            <ProtectedRoute path="/links/:id/edit">
              <EditLink />
            </ProtectedRoute>
            <ProtectedRoute path="/tags/create">
              <CreateTag />
            </ProtectedRoute>
            <ProtectedRoute path="/tags/edit/:id">
              <EditTag />
            </ProtectedRoute>
            <ProtectedRoute path="/tags">
              <ListTags />
            </ProtectedRoute>
            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute path="/:short_id">
              <ShortLink />
            </ProtectedRoute>

            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </div>
      </React.Fragment>
    </BrowserRouter>
  )
}

export default Routes
