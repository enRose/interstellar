import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import session from "express-session"
var livereload = require("livereload")
var connectLiveReload = require("connect-livereload")

const app = express()

const PORT = 5000

// open livereload high port and start to watch public directory for changes
const liveReloadServer = livereload.createServer()
liveReloadServer.watch(__dirname)

// ping browser on Express boot, once browser has reconnected and handshaken
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/")
    }, 100)
  })

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.send("Hello!")
        console.log('root') 
    } catch (error) {
        next(error)
    }
})

app.use(connectLiveReload())

app.use(cors())
app.use(express.json())

app.use(session({
    secret: "YOUR$UP3R$3CR3T",
    resave: true,
    saveUninitialized: true
}))

app.use('/api/auth', require('./authenticate'))
app.use('api/auth', require('./token'))
app.use('/api/acc', require('./acc'))

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})