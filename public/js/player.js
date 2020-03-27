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
	socket.emit('new_player', player)
	socket.on('get_player', newPlayer => {
		// FIXME Handle id 1
		if (newPlayer.team == player.team) {
			player.id = newPlayer.id
		}
		setWelcomeMessage()
	})
	init()
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

const setWelcomeMessage = () => {
	const msg = getTranslation('player-welcome', [player.team, player.room])
	$('#chat')
		.empty()
		.append(msg)
}

const init = () => {
	setTitle('Team: ' + player.team)
	document.getElementById('content').placeholder = getTranslation('player-input-placeholder')
}

/**
 * Socket stuff
 */

socket.on('spread_msg', msg => {
	setMessage(`<b>${special(msg.name)}</b> ${msg.content}`)
})

socket.on('change_button', changeButton)

socket.on('team_clicked', playerWhoAnswer => {
	const msg = getTranslation('player-click-button', [playerWhoAnswer.team])
	setMessage(msg)
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