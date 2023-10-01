import URL from "node:url"
import { fileURLToPath } from "url"
import path from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: path.join(__dirname, "/dev.sqlite3"),
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb),
    },
  },

  test: {
    client: "sqlite3",
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "/seeds"),
    },
    connection: {
      filename: ":memory:",
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb),
    },
  },

  production: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: URL.parse(process.env.DATABASE_URL).pathname,
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb),
    },
  },
}
