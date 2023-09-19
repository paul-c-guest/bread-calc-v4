import { useAuth0 } from "@auth0/auth0-react"
import { useLocation, useNavigate } from "react-router-dom"

export function Nav() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = () => {
    user ? logout() : loginWithRedirect()
  }

  return (
    <nav>
      <h1 id="title">Good Leavening</h1>
      <div className="login-block">
        <button className="login-button" onClick={handleLogin}>
          {isAuthenticated ? "Logout" : "Login"}
        </button>
        {isAuthenticated && (
          <div className="welcome-string">
            Welcome, {user?.given_name ?? user?.nickname}
          </div>
        )}
        <div className="nav-button-block">
          {isAuthenticated && location.pathname !== "/flours" && (
            <button className="nav-button" onClick={() => navigate("flours")}>
              Flours
            </button>
          )}
          {isAuthenticated && location.pathname !== "/" && (
            <button className="nav-button" onClick={() => navigate("/")}>
              Selections
            </button>
          )}
        </div>
      </div>
      <hr />
    </nav>
  )
}
