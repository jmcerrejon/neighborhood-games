const players = require('./player')()

module.exports = (socket, io) => {
	const newMsg = msg => {
		io.sockets.emit('spread_msg', msg)
	}

	const getPlayers = () => {
		io.sockets.emit('get_players', players.getAvailablePlayers())
	}

	const newPlayer = player => {
		player.id = socket.id
		players.addPlayer(player)
		io.sockets.emit('get_player', player)
		io.sockets.emit('get_players', players.getAvailablePlayers())
	}

	const disconnect = () => {
		players.delPlayer(socket.id)
		io.sockets.emit('get_players', players.getAvailablePlayers())
	}

	const buttonReady = isReady => {
		const newQuestion = true
		io.sockets.emit('change_button', {
			isReady,
			newQuestion
		})
	}

	const buttonPressed = player => {
		io.sockets.emit('change_button', {
			isReady: false
		})
		io.sockets.emit('team_clicked', player)
	}

	const checkAnswer = answer => {
		players.setScore(answer.playerId, answer.isValid)
		const player = players.getPlayer(answer.playerId)
		io.sockets.emit('check_player_answer', answer.isValid, player)
		io.sockets.emit('update_score', player)
	}

	return {
		newMsg,
		getPlayers,
		newPlayer,
		disconnect,
		buttonReady,
		buttonPressed,
		checkAnswer
	}
}