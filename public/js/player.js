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

	socket.on('get_players', newPlayer => {
		console.dir(newPlayer.player)
		const team = newPlayer.player
		player.id = team.id
		$('#chat')
			.empty()
			.append(`<h3>Welcome ${team.team} to room ${team.room}!</h3>`)
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
	if (player.id === playerWhoAnswer.id) {
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