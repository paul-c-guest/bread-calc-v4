import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"

export function Nav() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()
  const navigate = useNavigate()

  const handleLogin = () => {
    user ? logout() : loginWithRedirect()
  }

  return (
    <nav>
      <h1 id="title">Good Leavening</h1>
      <div className="nav-button-block">
        <button className="nav-button" onClick={handleLogin}>
          {isAuthenticated ? "Logout" : "Login"}
        </button>
        {isAuthenticated && (
          <button onClick={() => navigate("flours")} className="nav-button">
            Flours
          </button>
        )}
        {isAuthenticated && (
          <div className="welcome-string">
            Welcome, {user?.given_name ?? user?.nickname}
          </div>
        )}
      </div>
      <hr />
    </nav>
  )
}
