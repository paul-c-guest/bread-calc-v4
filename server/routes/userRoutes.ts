import express from "express"
const router = express.Router()

import * as db from "../db/queries/users"

// GET api/v1/user/:id
router.get("/:id", (req, res) => {
  res.status(500).send(`nothing implemented yet [get user ${req.params.id}]`)
})

export default router

router.get("/sub/:sub", async (req, res) => {
  const result = await db.getUserByAuth(req.params.sub)
  res.status(200).json(result)
})
