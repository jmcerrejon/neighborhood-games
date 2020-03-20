const socket = io()

const player = {
	team: getUrlParam('team', 'Harkonen House'),
	room: getUrlParam('room', 'secondary')
}

$(() => {
	socket.emit('new_player', player)

	socket.on('get_players', players => {
		console.log(JSON.stringify(players, null, 2))
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
	console.log('the button is', isReady)
})

const special = str => {
	return (str.replace(/</gi, '&lt;')).replace(/>/gi, '&gt;')
}