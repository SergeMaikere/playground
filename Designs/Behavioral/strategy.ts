import { curry, errorHandler, pipe } from '../helper'
import { bubbleSort, insertionSort, mergeSort, quickSort, selectionSort } from './sort'

/*========================================
=            STRATEGY PATTERN            =
========================================*/	

const STRATEGIES = [ 'bubble', 'selection', 'insertion', 'quick', 'merge'  ] as const

type SortStrategyList = typeof STRATEGIES[number]


/*----------  Context  ----------*/
export class StrategiesManager {

	private strategies: Strategy[]
	constructor () {
		this.strategies = []
	}

	add = ( strat: Strategy ) => {
		this.strategies = [ ...this.strategies, strat ]
		return strat
	}

	get = ( name: string ) => this.strategies.find( strat => strat.name === name )

	count = () => this.strategies.length
}

/*----------  Abstract Strategy  ----------*/
export class Strategy {
	readonly name: string
	private handler: any

	constructor (name: string, handler: Function) {
		this.name = name
		this.handler = handler
	}

	print = () => {
		console.group()
		console.log(this.name)
		console.group()
		console.log(this.execute)
		console.groupEnd()
		console.groupEnd()
		return this
	}

	execute = ( x: any ) => this.handler(x)
}


/*----------  Concrete Strategy Factory  ----------*/
class SortStrategyFactory {

	static get = ( name: SortStrategyList ) => {
		if ( name === 'bubble' ) return new Strategy('bubble', bubbleSort)
		if ( name === 'selection' ) return new Strategy('selection', selectionSort)
		if ( name === 'insertion' ) return new Strategy('insertion', insertionSort)
		if ( name === 'merge' ) return new Strategy('merge', mergeSort)
		if ( name === 'quick' ) return new Strategy('quick', quickSort)
		return errorHandler('Something went horribly wrong')
	}
}


const getRandomNumbersArray = () => [ ...Array(20) ].map( _item => Math.ceil(Math.random() * 100) )

export const run = () => {
	const sManager = new StrategiesManager()
	
	const makeStrategies = ( arr: SortStrategyList[] ) => arr.map( sName => SortStrategyFactory.get(sName) as Strategy )
	
	const addToManager = curry( (sManager: StrategiesManager, arr: Strategy[]) => arr.map(s => sManager.add(s)) )(sManager)
	
	const displayResult = curry(
		( sManager: StrategiesManager, rand: number[], arr: Strategy[] ) => {
			return arr.map(
				s => {
					console.log(s.name, sManager.get(s.name)?.execute([...rand])) 
					return s
				}
			)
		}
	)(sManager, getRandomNumbersArray())

	return pipe(
		makeStrategies,
		addToManager,
		displayResult
	)(STRATEGIES)		
}
