import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'

import App from './App.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="good-leavening.au.auth0.com"
    clientId="0vqnBRYY2SySxs4L583N3MVCoHan6CAG"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
)
