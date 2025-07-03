import { Person, User, UserInput } from '../Creational/builder'
import { errorHandler } from '../helper'


/*=======================================
=            MEMENTO PATTERN            =
=======================================*/

/**
 *
 * A behavioral design pattern in JavaScript called Memento focuses on 
 * externalizing and capturing an object's internal state so that 
 * it can later be restored. When you need to add features like undo/redo functionality, 
 * history tracking, or reverting an item to a former state, this pattern is quite helpful.
 *
 */



/*----------  Memento  ----------*/
type memento = {timestamp: number, json: string}


/*----------  Originator  ----------*/
export class Dude extends Person {

	constructor (userInfo: User) {
		super(userInfo)
	}

	createMemento = () => {
		if ( !this.isBuild ) errorHandler('Person data are not valid')
		return {key: this.id, json: JSON.stringify(this.userInfo())}
	}

	restoreMemento = ( userJSON: string | null ) => {
		if ( !userJSON ) return errorHandler('Unable to find backup')

		const userInfo: UserInput = JSON.parse(userJSON)

		this.firstName = userInfo.firstName
		this.lastName = userInfo.lastName
		this.email = userInfo.email
		this.password = userInfo.password
		this.birthday = userInfo.birthday
		this.address = userInfo.address
		this.shopAddress = userInfo.shopAddress
		this.contact_No = userInfo.contact_No
		this.key = userInfo.key
		this.isBuild = true

		return true
	}
}

/*----------  Caretaker  ----------*/

export class DudeBackUp {

	mementos: Map<string, memento[]> = new Map()

	add = ( user: {key: string ,json: string} ) => {
		this.mementos.set( user.key, this.addNewBackup(user) )
		return true
	}

	get = ( key: string | null ) => {
		if ( !key || !this.mementos.has(key) ) return errorHandler('There are no backup for this user ' + key)
		const result = (this.mementos.get(key) as memento[]).pop()
		return (result as memento).json
	}

	print = () => {
		if ( this.isEmpty() ) return errorHandler('DudeBackup is empty')
		console.log('\nDudeBackup')
		this.mementos.forEach( user => user.forEach(m => console.log(m.json)) )
		return true
	}

	private isEmpty = () => [ ...this.mementos.keys() ].length === 0  || [ ...this.mementos.values() ].every( user => user.length === 0 )

	private addNewBackup = ( user: {key: string ,json: string} ) => {
		const backup = { timestamp: Date.now(), json: user.json }
		return this.mementos.has(user.key) ? [ ...this.mementos.get(user.key) as memento[], backup ] : [ backup ]
	}
}



