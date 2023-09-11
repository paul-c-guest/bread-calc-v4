import express from "express"
const router = express.Router()

import * as db from "../db/db"

// GET api/v1/overrides/:user
router.get("/:user", async (req, res) => {
  const overrides = await db.getOverridesForUser(Number(req.params.user))

  if (overrides.length) res.status(200).json(overrides)
  else res.status(200).send("no overrides exist for the user")
})

router.post("/", async (req, res) => {
  const result = db.putOverride(req.body)
  if (result) res.status(200).json(result)
  else
    res
      .status(500)
      .send("something went wrong entering the user's override to the db")
})

export default router
