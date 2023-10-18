import express from "express"
const router = express.Router()

import * as db from "../db/queries/overrides"
import { Override } from "../../models/user"

// GET api/v1/overrides/:user
router.get("/:user", async (req, res) => {
  const overrides = await db.getOverridesForUser(req.params.user)

  if (overrides.length) res.status(200).json(overrides)
  else res.status(200).send("no overrides exist for the user")
})

router.post("/", async (req, res) => {
  const override: Override = req.body as Override

  const result = await db.putOverride(override)

  if (result) res.status(200).json(result)
  else
    res
      .status(500)
      .send("something went wrong entering the user's override to the db")
})

router.delete("/", async (req, res) => {
  const override = req.body as Override

  const result = await db.deleteOverride(override)

  res.status(200).json(result)
})

export default router
