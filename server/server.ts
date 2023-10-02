import express from "express"
import { fileURLToPath } from "url"
import path from "path"
import "dotenv/config"

import flourRoutes from "./routes/flourRoutes"
import userRoutes from "./routes/userRoutes"
import overrideRoutes from "./routes/overrideRoutes"

const server = express()

server.use(express.json())

server.use("/api/v1/flours", flourRoutes)
server.use("/api/v1/users", userRoutes)
server.use("/api/v1/overrides", overrideRoutes)

if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  server.use("/assets", express.static(path.join(__dirname, "assets")))

  server.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
  })
}

export default server
