import { Person, User, UserData } from '../Creational/builder'
import { errorHandler } from '../helper'

type memento = {timestamp: number, json: string}

export class Dude extends Person {

	constructor (userInfo: User) {
		super(userInfo)
	}

	hydrate = () => {
		if ( !this.isBuild ) errorHandler('Person data are not valid')
		return {key: this.id, json: JSON.stringify(this.userInfo())}
	}

	dehydrate = ( userJSON: string | undefined ) => {
		if ( !userJSON ) return errorHandler('Unable to find backup')

		const userInfo = JSON.parse(userJSON)

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

class DudeBackUp {

	mementos: { [user: string]: memento[] }

	constructor () {
		this.mementos = {}
	}

	add = ( user: {key: string ,json: string} ) => {
		const memento = { timestamp: Date.now(), json: user.json }
		if ( this.mementos[user.key] && this.mementos[user.key].length > 0 )
			this.mementos[user.key].push(memento)
		else 
			this.mementos[user.key] = [ memento ]
	}

	get = ( user: string ) => {
		const result = this.mementos[user]?.pop()
		if ( !result ) return errorHandler('There are no backup for this user ' + user)
		return result.json
	}

	index = () => {
		if ( this.isEmpty() ) return errorHandler('DudeBackup is empty')
		console.log('\nDudeBackup')
		for (const user in this.mementos) {
			console.log('\n', user)
			this.mementos[user].forEach( m => console.log(m) )
		}
		return true
	}

	private isEmpty = () => Object.keys(this.mementos).every( user => !this.mementos.hasOwnProperty(user) )
}


export class DudeFacade {

	private backup: DudeBackUp

	constructor () {
		this.backup = new DudeBackUp()
	}

	build = ( dude: Dude ) => {
		if ( !dude.build() ) return
		this.backup.add(dude.hydrate())
	}

	rollBack = ( dude: Dude ) => dude.dehydrate(this.backup.get(dude.id)) 

	print = () => this.backup.index()
}


