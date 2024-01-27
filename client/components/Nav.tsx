import { useAuth0 } from "@auth0/auth0-react"
import { useLocation, useNavigate } from "react-router-dom"

export function Nav() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = () => {
    isAuthenticated
      ? logout({
          logoutParams: { returnTo: window.location.origin },
        })
      : loginWithRedirect()
  }

  return (
    <nav>
      {/* implement state for hidden flag and attach to 'close' button */}
      <div className="help-popup" hidden={true}>
        <h2>Help</h2>
        <h3>Quickstart</h3>
        <p>How to get up and running</p>
        <h3>Detailed Files</h3>
        <p>Longer winded explanations</p>
        {/* consider implementing a close-on-click-outside type of behavious here */}
        <button>close</button>
      </div>
      <h1 id="title">Good Leavening</h1>
      <div className="nav-button-block">
        {
          <button
            className="nav-button"
            onClick={() => navigate("flours")}
            disabled={location.pathname === "/flours"}
          >
            Flours
          </button>
        }
        {
          <button
            className="nav-button"
            onClick={() => navigate("/")}
            disabled={location.pathname === "/"}
          >
            Selections
          </button>
        }
        <div className="login-block">
          <button className="login-button" onClick={handleClick}>
            {isAuthenticated ? "Logout" : "Login"}
          </button>
          {isAuthenticated && (
            <div className="welcome-string">
              Welcome, {user?.given_name ?? user?.nickname ?? "anon"}
            </div>
          )}
        </div>
      </div>
      <hr />
    </nav>
  )
}
