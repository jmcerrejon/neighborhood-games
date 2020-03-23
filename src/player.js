// TODO Transform module into a Class

module.exports = () => {
 	const players = new Map()

	const addPlayer = player => {
		players.set(player.id, { player })
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

	return {
		addPlayer,
		getAvailablePlayers,
		getPlayer,
		delPlayer
	}
}