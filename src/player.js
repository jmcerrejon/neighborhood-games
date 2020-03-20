// TODO Transform module to a Class

module.exports = function () {
	const players = new Map()

	function addPlayer(player) {
		players.set(player.id, { player })
	}

	function getAvailablePlayers() {
		return [...players.values()]
	}

	function getPlayer(id) {
		return players.get(id)
	}

	function delPlayer(id) {
		console.log('Team disconnected:', getPlayer(id))
		players.delete(id)
		console.log('Current teams:', getAvailablePlayers())
	}

	return {
		addPlayer,
		getAvailablePlayers,
		delPlayer
	}
}