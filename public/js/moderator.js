const socket = io({
	forceNew: false
})
let state = {
	isReady: false
}

/**
 * Functions
 */

window.onload = () => {
	const msg = getTranslation('moderator-welcome')
	setMessage(msg)
	socket.emit('get_players')
}

const setAnswerMsg = player => {
	const msg = getTranslation('moderator-answer', [player.id, player.id])
	setMessage(msg)
}

const checkAnswer = (isValid, playerId) => {
	$('.spAnswer').remove()
	const strValid = (isValid) ? getTranslation('correct') : getTranslation('incorrect')
	const classValid = (isValid) ? 'button-green-min' : 'button-red-min'
	const msg = getTranslation('moderator-answer-is', [classValid, strValid])
	
	setMessage(msg)
	sendMsgToAllPlayers(msg)
	
	socket.emit('check_server_answer', {
		isValid,
		playerId
	})
}

const setScore = player => {
	document.getElementById(player.id).innerHTML = `· ${player.team} - ${player.score}`
}

const sendMsgToAllPlayers = content => {
	socket.emit('new_msg', {
		name: 'Moderator',
		content
	})
}

/**
 * Events
 */

$('#button').click(() => {
	state.isReady = !state.isReady
	socket.emit('button_ready', state.isReady)
	setButtonColor((state.isReady) ? 'button-gray' : 'button-yellow')
	if (state.isReady) {
		const msg = getTranslation('moderator-answer-message')
		sendMsgToAllPlayers(msg)
	}
})

/**
 * Socket stuff
 */

socket.on('get_players', players => {
	$('#players').empty()
	players.map((player) => {
		const msg = getTranslation('moderator-player-new', [player.team])
		$('#players').append(`<li id="${player.id}">· ${player.team} - ${player.score}</li>`)
		setMessage(msg)
	})
})

socket.on('change_button', ({isReady}) => {
	state.isReady = isReady
	setButtonColor((!isReady) ? 'button-yellow' : 'button-gray')
})

socket.on('team_clicked', playerWhoAnswer => {
	const msg = getTranslation('player-click-button', [playerWhoAnswer.team])
	setMessage(msg)
	setAnswerMsg(playerWhoAnswer)
})

socket.on('spread_server_msg', msg => {
	setMessage(msg.content)
})

socket.on('update_score', player => {
	setScore(player)
})