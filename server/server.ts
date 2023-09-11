import express from "express"
import * as Path from "node:path"
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
  server.use("/assets", express.static(Path.resolve(__dirname, "../assets")))
  server.get("*", (req, res) => {
    res.sendFile(Path.resolve(__dirname, "../index.html"))
  })
}

export default server
