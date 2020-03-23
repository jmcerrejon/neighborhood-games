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
		io.sockets.emit('change_button', isReady)
	}

	const buttonPressed = player => {
		io.sockets.emit('change_button', false)
		io.sockets.emit('team_clicked', player)
	}

	const checkAnswer = ({isValid}) => {
		io.sockets.emit('change_button', !isValid)
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