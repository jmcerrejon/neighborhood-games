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
			setMessage(`New Player!: ${player.team}`)
		})
	})

	socket.on('change_button', isReadyFromServer => {
		state.isReady = isReadyFromServer
		setButtonColor('button', (!isReadyFromServer) ? 'button-yellow' : 'button-gray')
	})

	socket.on('team_clicked', playerWhoAnswer => {
		setMessage(`<b>${playerWhoAnswer.team}</b> clicked the button!`)
		setAnswerMsg(playerWhoAnswer)
	})

	setMessage('<b>Welcome to the Panel!</b>')
})

$('#button').click(event => {
	state.isReady = !state.isReady
	socket.emit('button_ready', state.isReady)
	setButtonColor('button', (state.isReady) ? 'button-gray' : 'button-yellow')
})

const setAnswerMsg = player => {
	setMessage(`Is it the answer <a class="button-green-min" href="#" onclick="validAnswer(true, \'${player.id}\')">CORRECT</a> or <a class="button-red-min" href="#" onclick="validAnswer(false, \'${player.id}\')">INCORRECT</a>?`)
}

const validAnswer = (isValid, playerId) => {
	const strValid = (isValid) ? 'Correct!' : 'INcorrect'
	setMessage(`Player ${playerId} answer is... ${strValid}`)
	// TODO Emit msg
}