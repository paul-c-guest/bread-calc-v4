import express from "express"
const router = express.Router()

import * as db from "../db/queries/flours"
import checkJwt, { JwtRequest } from "../auth0"
import { FlourData } from "../../models/flour"

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

// POST api/v1/flours
router.post("/", checkJwt, async (req: JwtRequest, res) => {
  const newFlour: FlourData = { ...req.body, owner: req.auth?.sub }

  const result = await db.putFlour(newFlour)

  if (result) res.status(200).json(result)
  else res.status(500).send("something went wrong entering the flour to the db")
})

router.delete("/:id", async (req, res) => {
  const result = await db.deleteFlour(Number(req.params.id))
  if (result)
    res.status(200).send(`successfully deleted flour ${req.params.id}`)
  else
    res.status(500).send(`something went wrong deleting flour ${req.params.id}`)
})

export default router
