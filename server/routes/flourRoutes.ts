import express from "express"
const router = express.Router()

import * as db from "../db/db"

// GET api/v1/flours
router.get("/", async (req, res) => {
  const flours = await db.getAllFlours()
  res.status(200).json(flours)
})

// GET api/v1/flours/:id
router.get("/:id", async (req, res) => {
  const flour = await db.getFlourById(Number(req.params.id))
  res.status(200).json(flour)
})

export default router
