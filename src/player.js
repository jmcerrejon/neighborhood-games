module.exports = () => {
 	const players = new Map()

	const addPlayer = player => {
		players.set(player.id, player)
	}

	const getAvailablePlayers = () => {
		return (players.size === 0) ? [] : [...players.values()]
	}

	const getPlayer = id => {
		return {...players.get(id)}
	}

	const delPlayer = id => {
		players.delete(id)
	}

	const setScore = (id, validAnswer) => {
		const player = players.get(id)
		if (player.score === 0 && !validAnswer) {
			return;
		}
		player.score += (validAnswer) ? 1 : -1
		players.set(id, player)
	}

	return {
		addPlayer,
		getAvailablePlayers,
		getPlayer,
		delPlayer,
		setScore
	}
}