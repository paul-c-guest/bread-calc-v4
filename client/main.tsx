import ReactDOM from "react-dom/client"
// import { Auth0Provider } from "@auth0/auth0-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import "./index.css"
import { routes } from "./routes"

const qclient = new QueryClient()
const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <Auth0Provider
  //   domain="good-leavening.au.auth0.com"
  //   clientId="0vqnBRYY2SySxs4L583N3MVCoHan6CAG"
  //   authorizationParams={{
  //     redirect_uri: window.location.origin,
  //   }}
  //   cacheLocation="localstorage"
  // >
    <QueryClientProvider client={qclient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  // </Auth0Provider>,
)
