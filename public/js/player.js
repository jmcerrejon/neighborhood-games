const socket = io({
	forceNew: false
})
let player = {
	team: getUrlParam('team', 'Harkonen House'),
	room: getUrlParam('room', 'secondary')
}
let state = {
	isReady: false,
	waitUntilNextQuestion: false
}

/**
 * Functions
 */

window.onload = () => {
	setTitle('Team: ' + player.team)

	socket.emit('new_player', player)

	socket.on('get_player', newPlayer => {
		// FIXME Handle id 1
		if (newPlayer.team == player.team) {
			player.id = newPlayer.id
		}
		$('#chat')
			.empty()
			.append(`<h3>Welcome ${player.team} to room ${player.room}!</h3>`)
	})
}

const changeButton = ({isReady, newQuestion = false}) => {
	if (newQuestion) {
		state = {
			isReady: false,
			waitUntilNextQuestion: false
		}
	}
	if (state.waitUntilNextQuestion) {
		return
	}
	state.isReady = isReady
	setButtonColor((isReady) ? 'button-yellow' : 'button-gray')
}

/**
 * Socket stuff
 */

socket.on('spread_msg', msg => {
	setMessage(`<b>${special(msg.name)}</b> ${msg.content}`)
})

socket.on('change_button', changeButton)

socket.on('team_clicked', playerWhoAnswer => {
	setMessage(`<b>${playerWhoAnswer.team}</b> clicked the button!`)
	// FIXME Handle id 2
	if (player.team === playerWhoAnswer.team) {
		setButtonColor('button-green')
	}
})

socket.on('check_answer', ({isValid, playerId}) => {
	if ((player.id === playerId) && (isValid === false)) {
		state.isReady = false
		state.waitUntilNextQuestion = true
		setButtonColor('button-red')
		return
	}

	changeButton({
		isReady: !isValid
	})
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