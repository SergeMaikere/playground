import { faker } from "@faker-js/faker"

/*================================
=            MEDIATOR            =
================================*/


/**
 *
 * The Mediator pattern provides central authority over a group of objects
 * by encapsulating how these objects interact. This model is useful for 
 * scenarios where there is a need to manage complex conditions in which 
 * every object is aware of any state change in any other object in the group.
 *
 */




/*----------  Mediator  ----------*/

export class Chatroom {

	private participants: Map<string, Participant>

	constructor () {
		this.participants = new Map()
	}

	register = ( p: Participant ) => {
		if ( this.participants.has(p.name) ) throw new Error(`Username '${p.name}' is already taken`)
		this.participants.set(p.name, p)
		p.chatroom = this
		return this
	}

	send = ( message: string, from: Participant, to: Participant | null = null ) => {
		to ? to.receive(message, from) : this.broadcast(message, from)
		return this
	}

	userCount = () => this.participants.size

	private broadcast = ( message: string, from: Participant ) => {
		this.participants.forEach( p => p !== from && p.receive(message, from) )
	}
}


/*----------  Collegues  ----------*/

export class Participant {

	readonly name: string
	readonly id: string
	chatroom: Chatroom | null

	constructor ( name: string ) {
		this.name = name
		this.id = faker.string.nanoid()
		this.chatroom = null
	}

	send = ( message: string, to: Participant | null = null ) => {
		if ( !this.chatroom ) return console.error(`${this.name} is not registerd to a chatroom`)
		this.chatroom.send(message, this, to)
		return this
	}

	receive = ( message: string, from: Participant ) => {
		console.log(`\nFrom: ${from.name} to ${this.name}`)
		console.log(message)
		return true
	}
}