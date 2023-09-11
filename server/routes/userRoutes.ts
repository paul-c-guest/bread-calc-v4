import express from "express"
const router = express.Router()

import * as db from "../db/db"

// GET api/v1/user/:id
router.get("/:id", (req, res) => {
  // await db.get
  res.status(500).send("not implemented yet - PG")
})

export default router
