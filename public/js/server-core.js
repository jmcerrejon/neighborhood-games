const socket = io()

$(() => {
	socket.on('get_players', players => {
		$('#players').empty()
		players.map(({player}) => {
			$('#players').append(`<li>· ${player.team}</li>`)
		})
	})
})
