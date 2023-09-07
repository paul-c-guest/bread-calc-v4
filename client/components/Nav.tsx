import { useAuth0 } from '@auth0/auth0-react'

export function Nav() {
  const { loginWithRedirect } = useAuth0()

  const handleLogin = () => {
    loginWithRedirect()
  }

  return (
    <nav>
      <button onClick={handleLogin}>Login</button>
    </nav>
  )
}
