const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const players = require('./src/player')()

io.on('connection', socket => {
	socket.on('new_msg', msg => {
		io.sockets.emit('spread_msg', msg)
	})

	socket.on('new_player', player => {
		player.id = socket.id
		players.addPlayer(player)
		console.log('New player:', JSON.stringify(player, null, 2))

		socket.emit('get_players', players.getAvailablePlayers())
	})

	socket.on('disconnect', soket => {
		players.delPlayer(socket.id)
	})
})

app.use(express.static(__dirname + '/public'))

const server = http.listen(8080, () => {
	console.log("Server ready at http://127.0.0.1:8080")
})