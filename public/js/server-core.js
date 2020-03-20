const socket = io()

$(() => {
	socket.emit('get_players')
	socket.on('get_players', players => {
		$('#players').empty()
		players.map(({player}) => {
			$('#players').append(`<li>· ${player.team}</li>`)
		})
	})
})
