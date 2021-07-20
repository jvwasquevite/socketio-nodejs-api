import express from 'express'
import path from 'path'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

const app = express()

/**
 * HTTP protocol
 * Web socket protocol (WSS)
 */

const server = createServer(app)
const io = new Server(server)

/**
 * Defining public folder with HTML for frontend
 * Configuring views on backend with HTML
 */

app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('views', path.join(__dirname, '..', 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

/**
 * Creating view route
 */
app.use('/', (req, res) => {
  res.render('/index.html')
})

io.on('connection', (socket: Socket) => {
  console.log('Se conectou', socket.id)
})

server.listen(3000, () => console.log('Server is running on port 3000'))
