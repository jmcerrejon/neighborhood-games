const socket = io()
let state = {
	isReady: false
}

$(() => {
	socket.emit('get_players')
	socket.on('get_players', players => {
		$('#players').empty()
		players.map(({player}) => {
			$('#players').append(`<li>· ${player.team}</li>`)
		})
	})
})

$('#button').click(event => {
	state.isReady = !state.isReady
	socket.emit('button_ready', state.isReady)
	setButtonColor('button', (state.isReady) ? 'button-gray' : 'button-yellow')
})
