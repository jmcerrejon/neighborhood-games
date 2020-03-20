const socket = io()

$(() => {
	socket.on('get_players', players => {
		console.log('entro');
		console.log(JSON.stringify(players, null, 2))
	})
})
