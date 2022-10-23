import { Router, response } from 'express'
import { check } from 'express-validator'
import { validateInput } from './validator'

const router = Router()

const token = async (req:any, res = response) => {
  const {session} = req.body

  console.log(`session: ${session}`)

  res.json({
    accessToken: 'This is an access token',
    refreshToken: 'This is a refresh token'
  })
}

router.post('/token',[
    check('session', 'Session is required').not().isEmpty(),
    validateInput
], token)

module.exports = router