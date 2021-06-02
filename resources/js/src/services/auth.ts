const isAuthenticated = () => {
  const token = localStorage.getItem('token')

  return token
}

const authenticate = (token) => {
  localStorage.setItem('token', token)
}

const logout = () => {
  localStorage.clear()
}

export default {
  isAuthenticated,
  authenticate,
  logout,
}
