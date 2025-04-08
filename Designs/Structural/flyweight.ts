
class Flyweight {

	readonly make: string
	readonly model: string
	readonly processor: string

	constructor ( make: string, model: string, processor: string ) {
		this.make = make
		this.model = model
		this.processor = processor
	}

	print = () => {
		console.log('\nmake: ', this.make)
		console.log('model: ', this.model)
		console.log('processor: ', this.processor)
	}
}

export class FlyweightFactory {

	private static flyweights: {[index: string]: Flyweight} = {}

	static get = ( make: string, model: string, processor: string ): Flyweight => {
		const index = '' + make + model + processor
		if ( !this.flyweights[index] ) 
			this.flyweights[index] = new Flyweight(make, model, processor)

		return this.flyweights[index]
	}

	static count = () => Object.keys(this.flyweights).length
}

class Computer extends Flyweight {

	private flyweight: Flyweight
	readonly memory: string
	readonly tag: string

	constructor (make: string, model: string, processor: string, memory: string, tag: string) {
		super(make, model, processor)
		this.flyweight = FlyweightFactory.get(make, model, processor)
		this.memory = memory
		this.tag = tag
	}

	print = () => {
		this.flyweight.print()
		console.log('memory ', this.memory)
		console.log('tag ', this.tag)
	}
}


export class ComputerStock {

	stock: { [tag: string]: Computer }

	constructor () {
		this.stock = {}
	}

	add = ( make: string, model: string, processor: string, memory: string, tag: string ) => {
		this.stock[tag] = new Computer(make, model, processor, memory, tag)
		return this
	}

	remove = (tag: string) => {
		if ( !this.stock[tag] ) this.errorTag()
		delete this.stock[tag]
		return this
	}

	get = (tag: string) => this.stock[tag] ? this.stock[tag] : this.errorTag()

	count = () => Object.keys(this.stock).length

	private errorTag = () => { throw new Error('Tag does not exists in this stock') }
}