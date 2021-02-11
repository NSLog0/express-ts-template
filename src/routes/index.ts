import express from 'express'

import { authentications } from '../components/Authentications/authController'

const router = express.Router()

router
  .post('/api/login', authentications)

export default router
