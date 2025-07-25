import { pick } from "../helper"

/**
 *
 * The Flyweight pattern conserves memory by sharing large numbers of fine-grained 
 * objects efficiently. Shared flyweight objects are immutable, that is,
 * they cannot be changed as they represent the characteristics that are shared with other objects.
 *
 */


interface F {
	make: string,
	model: string,
	processor: string
}

interface C extends F {
	memory: string,
	tag: string
}


class Flyweight {

	readonly make: string
	readonly model: string
	readonly processor: string

	constructor ( flyweight: F ) {
		this.make = flyweight.make
		this.model = flyweight.model
		this.processor = flyweight.processor
	}

	print = () => {
		console.log('\nmake: ', this.make)
		console.log('model: ', this.model)
		console.log('processor: ', this.processor)
	}
}

export class FlyweightFactory {

	private static flyweights: {[index: string]: Flyweight} = {}

	static get = ( fly: F ): Flyweight => {
		const index = '' + fly.make + fly.model + fly.processor
		if ( !this.flyweights[index] ) 
			this.flyweights[index] = new Flyweight(fly)

		return this.flyweights[index]
	}

	static count = (): number => Object.keys(this.flyweights).length
}

export class Computer extends Flyweight {

	readonly flyweight: Flyweight
	readonly memory: string
	readonly tag: string

	constructor ( pc: C ) {
		super(pick(pc, 'make', 'model', 'processor'))
		this.flyweight = FlyweightFactory.get(pick(pc, 'make', 'model', 'processor'))
		this.memory = pc.memory
		this.tag = pc.tag
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

	add = ( pc: C ) => {
		this.stock[pc.tag] = new Computer(pc)
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