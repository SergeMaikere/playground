
const buildMatchesTable = ( numberOfTeams ) => createTable( getRange(numberOfTeams) )

const getRange = n => Array.from( Array(n), (x, i) => i + 1 )

const createTable = range => [...Array(range.length -1 )].map( r => getRound(range) )

const getRound = range => {
	let result = buildRound(range)
	shuffleRange(range)
	return result
}

const buildRound = (range) => {
	let result = []
	let temp = [...range]
	for (var i = 0; i < range.length / 2; i++) {
		result.push( [range[i], temp.pop()] )
	}
	return result
}

const shuffleRange = (range) => {
	const last = range.pop()
	range.splice(1, 0, last)
}

buildMatchesTable(20)