import { useAuth0 } from "@auth0/auth0-react"

export function Nav() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()

  const handleLogin = () => {
    user ? logout() : loginWithRedirect()
  }

  return (
    <nav>
      <h1 id="title">Good Leavening</h1>
      <button className="log-button" onClick={handleLogin}>
        {isAuthenticated ? "Logout" : "Login"}
      </button>
      {isAuthenticated && (
        <h3>Welcome, {user?.given_name ?? user?.nickname}</h3>
      )}
      <hr />
    </nav>
  )
}
