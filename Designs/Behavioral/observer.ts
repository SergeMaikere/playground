import { faker } from '@faker-js/faker'

/*========================================
=            OBSERVER PATTERN            =
========================================*/

/**
 *
 * The Observer Design Pattern is a behavioral design pattern 
 * that defines a one-to-many dependency between objects. 
 * When one object (the subject) changes state, all its dependents (observers) 
 * are notified and updated automatically.
 *
 */



/*----------  Subject  ----------*/
export class WeatherStation {

	private observers: Display[]
	private temperature: number

	constructor () {
		this.observers = []
		this.temperature = 0
	}

	setTemperature (t: number) {
		this.temperature = t
		this.notifyObservers()
		return this
	}

	addObserver = ( obs: Display ): WeatherStation => {
		this.observers.push(obs)
		return this
	}

	removeObserver = ( obsId: string ): WeatherStation => {
		this.observers = this.observers.filter( observer => observer.id !== obsId )
		return this
	}

	count = () => this.observers.length

	private notifyObservers = () => {
		this.observers.forEach( obs => obs.update(this.temperature) )
	}

}


/*----------  Observer  ----------*/
export class Display {

	name: string
	id: string
	private temperature: number = 0

	constructor ( name: string ) {
		this.name = name
		this.id = faker.string.nanoid()
	}

	update = ( t: number ) => this.temperature = t

	print = () => {
		console.log(`${this.name}: Temperature is ${this.temperature}°C`)
	}
}