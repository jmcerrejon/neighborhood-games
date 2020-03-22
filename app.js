const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const players = require('./src/player')()

io.on('connection', socket => {
	socket.on('new_msg', msg => {
		io.sockets.emit('spread_msg', msg)
	})

	socket.on('get_players', () => {
		socket.emit('get_players', players.getAvailablePlayers())
	})

	socket.on('new_player', player => {
		player.id = socket.id
		players.addPlayer(player)
		console.log('New player:', JSON.stringify(player, null, 2))

		io.sockets.emit('get_players', players.getAvailablePlayers())
	})

	socket.on('disconnect', soket => {
		players.delPlayer(socket.id)
		io.sockets.emit('get_players', players.getAvailablePlayers())
	})

	socket.on('button_ready', isReady => {
		io.sockets.emit('change_button', isReady)
	})

	socket.on('button_pressed', player => {
		console.log('Player:', player)
		io.sockets.emit('change_button', false)
		io.sockets.emit('team_clicked', player)
	})

	socket.on('check_answer', ({isValid, playerId}) => {
		io.sockets.emit('change_button', !isValid)
	})
})

app.use(express.static(__dirname + '/public'))

const server = http.listen(8080, () => {
	console.log("Server ready at http://127.0.0.1:8080")
})