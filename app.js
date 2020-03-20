const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
let players = new Set()

io.on('connection', socket => {
	console.log('New user connected | Id:', socket.id)

	socket.on('new_msg', msg => {
		io.sockets.emit('spread_msg', msg)
	})

	socket.on('new_player', player => {
		player.id = socket.id
		players.add(player)

		socket.emit('get_players', [...players])
	})

	socket.on('disconnect', soket => {
		players.forEach(value => {
			if (value.id === socket.id) {
				players.delete(value)
				console.log('Team disconnected:', value)
			}
		})
	})
})

app.use(express.static(__dirname + '/public'))

const server = http.listen(8080, () => {
	console.log("Server ready at http://127.0.0.1:8080")
})