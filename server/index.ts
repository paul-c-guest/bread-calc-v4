import server from "./server"

const PORT: number = Number(process.env.PORT) || 3000
const HOST = "0.0.0.0"

server.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log("Server listening on port", PORT)
})
