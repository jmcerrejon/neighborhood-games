const socket = io()
let player = {
	team: getUrlParam('team', 'Harkonen House'),
	room: getUrlParam('room', 'secondary')
}
let state = {
	isReady: false
}

window.onload = () => {
	setTitle('Team: ' + player.team)

	socket.emit('new_player', player)

	socket.on('get_player', newPlayer => {
		// FIXME Handle id 1
		player.id = newPlayer.id
		console.log(JSON.stringify(newPlayer, null, 2));
		$('#chat')
			.empty()
			.append(`<h3>Welcome ${player.team} to room ${player.room}!</h3>`)
	})
}

socket.on('spread_msg', msg => {
	setMessage(`<b>${special(msg.name)}</b> ${msg.content}`)
})

socket.on('change_button', isReadyFromServer => {
	state.isReady = isReadyFromServer
	setButtonColor((isReadyFromServer) ? 'button-yellow' : 'button-gray')
})

socket.on('team_clicked', playerWhoAnswer => {
	setMessage(`<b>${playerWhoAnswer.team}</b> clicked the button!`)
	// FIXME Handle id 2
	if (player.team === playerWhoAnswer.team) {
		setButtonColor('button-green')
	}
})

socket.on('check_answer', ({isValid, playerId}) => {
	console.log({isValid}, {playerId})
})

/**
 * Events
 */

$('form').on('submit', event => {
	event.preventDefault()
	let msg = {
		name: player.team,
		content: $('#content').val().trim()
	}
	if (msg.content.length > 0) {
		socket.emit('new_msg', msg)
		$('#content').val('').focus()
	}
})

$('#button').click(event => {
	if (state.isReady) {
		// TODO Counter
		socket.emit('button_pressed', player)
	}
})