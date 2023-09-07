import express from 'express'
import { devFlourDb } from '../db/mock-seeds'
const router = express.Router()

// GET api/v1/flours
router.get('/', async (req, res) => {
  // todo: knex etc
  res.status(200).json(devFlourDb)
})

export default router
