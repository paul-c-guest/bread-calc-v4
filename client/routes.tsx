import { Route, createRoutesFromElements } from "react-router-dom"
import { App } from "./components/App"
import SelectionsPage from "./components/SelectionsPage"
import { FloursPage } from "./components/FloursPage"

export const routes = createRoutesFromElements(
  <Route element={<App />}>
    <Route index element={<SelectionsPage />} />
    <Route path="flours" element={<FloursPage />} />
  </Route>,
)
