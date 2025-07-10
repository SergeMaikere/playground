import { describe, it } from 'mocha'
import { assert } from 'chai'
import { StrategiesManager, Strategy } from '../../Behavioral/strategy'
import { bubbleSort, insertionSort } from '../../Behavioral/sort'

const reverse = [9, 8, 7, 6, 5, 4, 3, 2, 1]
const ordered = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const executes = () => {
	const bubbleSortStrat = new Strategy('bubble', bubbleSort)
	assert.deepEqual( bubbleSortStrat.execute(reverse), ordered )
}

const adds = () => {
	const sManager = new StrategiesManager()
	sManager.add(new Strategy('insertion', insertionSort))
	assert.equal( sManager.count(), 1 )
}

describe( 'Strategy¨Pattern', 
	() => {
		it( 'Executes a strategy', executes )
		it( 'Adds a strategy to Strategy Manager', adds )
	}
)

