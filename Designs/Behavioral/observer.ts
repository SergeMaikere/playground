import { faker } from '@faker-js/faker'

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

	removeObserver = ( obs: Display ): WeatherStation => {
		this.observers = this.observers.filter( observer => observer !== obs )
		return this
	}

	notifyObservers = () => {
		this.observers.forEach( obs => obs.update(this.temperature) )
	}

}

export class Display {

	name: string
	id: string

	constructor ( name: string ) {
		this.name = name
		this.id = faker.string.nanoid()
	}

	update = ( temperature: number ) => {
		console.log(`${this.name} Display: Temperature is ${temperature}°C`)
	}
}