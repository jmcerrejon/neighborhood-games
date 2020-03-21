const socket = io()

const player = {
	team: getUrlParam('team', 'Harkonen House'),
	room: getUrlParam('room', 'secondary')
}

$(() => {
	socket.emit('new_player', player)

	socket.on('get_players', players => {
		const team = getUrlParam('team', 'Harkonen House')
		const room = getUrlParam('room', 'secondary')

		$('#chat')
			.empty()
			.append(`<h3>Welcome ${team} to room ${room}!</h3>`)
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
	$('#chat')
		.append(`<b>${special(msg.name)}</b> ${special(msg.content)}<br>`)
	const divChat = $('#chat');
	divChat.scrollTop(divChat.prop("scrollHeight"));
})

socket.on('change_button', isReady => {
	setButtonColor('button', (isReady) ? 'button-yellow' : 'button-gray')
})

const special = str => {
	return (str.replace(/</gi, '&lt;')).replace(/>/gi, '&gt;')
}

$('#button').click(event => {
	socket.emit('button_pressed', player)
})