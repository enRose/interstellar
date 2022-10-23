import { Router, response } from 'express'
import { check } from 'express-validator'
import { validateInput } from './validator'

const router = Router()

const login = async (req:any, res = response) => {
  const { accessId, password } = req.body

  console.log(`accessId: ${accessId}, pw: ${password}`)

  if (password === 'yini') {
    return res.status(400).json({
      msg: "User / Password are incorrect",
    })
  }

  res.json({
    username: 'Test User',
    session: 'This is a session token',
    // 5 minutes
    expiry: new Date(Date.now() + (5 * 60 * 1000))
  })
}

router.post('/login',[
    check('accessId', 'AccessId is required').isNumeric(),
    check('password', 'Password is required').not().isEmpty(),
    validateInput
], login)

module.exports = router