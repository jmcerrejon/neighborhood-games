// TODO Transform module into a Class

module.exports = () => {
 	const players = new Map()

	const addPlayer = player => {
		players.set(player.id, { player })
	}

	const getAvailablePlayers = () => {
		return [...players.values()]
	}

	const getPlayer = id => {
		return players.get(id)
	}

	const delPlayer = id => {
		console.log('Team disconnected:', getPlayer(id))
		players.delete(id)
	}

	return {
		addPlayer,
		getAvailablePlayers,
		delPlayer
	}
}