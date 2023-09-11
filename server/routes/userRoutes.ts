import express from "express"
const router = express.Router()

import * as db from "../db/db"

// GET api/v1/user/:id
router.get("/:id", (req, res) => {
  db
  res.status(500).send(`nothing implemented yet [get user ${req.params.id}]`)
})

export default router
