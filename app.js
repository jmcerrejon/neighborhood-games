const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const players = []

io.on('connection', socket => {
	console.log('New user connected | Id: ', socket.id)
	socket.emit('hello')
	socket.on('new_msg', msg => {
		io.sockets.emit('spread_msg', msg)

	})
	socket.on('disconnect', soket => {
		console.log('User disconnected | Id: ', socket.id)
	})
})

app.use(express.static(__dirname + '/public'))

const server = http.listen(8080, () => {
	console.log("Server ready at http://127.0.0.1:8080")
})