import express from "express"
const router = express.Router()

import * as db from "../db/queries/overrides"
import { Override } from "../../models/user"
import checkJwt, { JwtRequest } from "../auth0"

// GET api/v1/overrides/owner
router.get("/owner", checkJwt, async (req: JwtRequest, res) => {
  if (!req.auth?.sub)
    return res.status(400).send("not authed to retrieve overrides")

  const overrides = await db.getOverridesForOwner(req.auth.sub)

  if (overrides.length) res.status(200).json(overrides)
  else res.status(200).send("no overrides exist for the user")
})

// POST api/v1/overrides
router.post("/", async (req, res) => {
  const override: Override = req.body as Override

  const result = await db.createOverride(override)

  result
    ? res.status(200).json(result)
    : res
        .status(500)
        .send(`error creating the override for flourId ${override.flourId}`)
})

// PUT api/v1/overrides
router.put("/", async (req, res) => {
  const override = req.body as Override

  const result = await db.updateOverride(override)

  result
    ? res.status(200).json(result)
    : res
        .status(500)
        .send(`error updating the override for flourId ${override.flourId}`)
})

// DELETE api/v1/overrides
router.delete("/", async (req, res) => {
  const override = req.body as Override

  const result = await db.deleteOverride(override)

  res.status(200).json(result)
})

export default router
