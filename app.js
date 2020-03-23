const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const socketReq = require('./src/socket-core')

io.on('connection', socket => {
	const {
		newMsg,
		getPlayers,
		newPlayer,
		disconnect,
		buttonReady,
		buttonPressed,
		checkAnswer
	} = socketReq(socket, io)

	socket.on('new_msg', newMsg)

	socket.on('get_players', getPlayers)

	socket.on('new_player', newPlayer)

	socket.on('disconnect', disconnect)
	
	socket.on('button_ready', buttonReady)

	socket.on('button_pressed', buttonPressed)

	socket.on('check_answer', checkAnswer)
})

app.use(express.static(__dirname + '/public'))

const server = http.listen(8080, () => {
	console.log("Server ready at http://127.0.0.1:8080")
})