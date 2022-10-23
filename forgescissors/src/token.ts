import { Router, response } from 'express'
import { check } from 'express-validator'
import { validateInput } from './validator'

const router = Router()

const token = async (req:any, res = response) => {
  const {session} = req.body

  console.log(`received session: ${session}`)

  res.json({
    accessToken: 'This is an access token',
    accessTokenExpiry: new Date(Date.now() + (1 * 60 * 1000)),
    refreshToken: 'This is a refresh token',
    refreshTokenExpiry: new Date(Date.now() + (10 * 60 * 1000))
  })
}

router.post('/token',[
    check('session', 'Session is required').not().isEmpty(),
    validateInput
], token)

module.exports = router