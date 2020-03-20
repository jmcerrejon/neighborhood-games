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

$('#button').click((event) => {
	socket.emit('button_ready', state.isReady)
	// TODO change button color to gray/Yellow
	changeButtonColor(state.isReady)
	state.isReady = !state.isReady
})

const changeButtonColor = isReady => {
	console.log((isReady ) ? 'Gray' : 'Yellow')
}