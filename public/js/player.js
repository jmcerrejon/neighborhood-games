const socket = io()

const player = {
	team: getUrlParam('team', 'Harkonen House'),
	room: getUrlParam('room', 'secondary')
}
let isReady = false

$(() => {
	socket.emit('new_player', player)

	socket.on('get_players', players => {
		player.id = socket.id
		$('#chat')
			.empty()
			.append(`<h3>Welcome ${player.team} to room ${player.room}!</h3>`)
	})
})

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

socket.on('spread_msg', msg => {
	setMessage(`<b>${special(msg.name)}</b> ${special(msg.content)}`)
})

socket.on('change_button', isReadyFromServer => {
	isReady = isReadyFromServer
	setButtonColor('button', (isReadyFromServer) ? 'button-yellow' : 'button-gray')
})

socket.on('team_clicked', playerWhoAnswer => {
	setMessage(`<b>${playerWhoAnswer.team}</b> clicked the button!`)
	if (player.id === playerWhoAnswer.id) {
		setButtonColor('button', 'button-green')
	}
})

const special = str => {
	return (str.replace(/</gi, '&lt;')).replace(/>/gi, '&gt;')
}

$('#button').click(event => {
	if (isReady) {
		// TODO Counter
		socket.emit('button_pressed', player)
	}
})