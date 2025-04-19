import { Person, User } from '../Creational/builder'

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
	}
}

export class DudeBackUp {

	mementos: Map<string, string>

	constructor () {
		this.mementos = new Map()
	}

	add = ( user: {key: string ,json: string} ) => this.mementos.set(user.key, user.json)

	get = (key: string) => {
		const result = this.mementos.get(key)
		this.mementos.delete(key)
		return result
	}

	last = () => Array.from(this.mementos)[this.mementos.size - 1][1] 

	index = () => {
		if ( this.isEmpty() ) return errorHandler('DudeBackup is empty')
		console.log('\nDudeBackup')
		this.mementos.forEach( (v, k) => console.log({k, v}) )
	}

	private isEmpty = () => this.mementos.size === 0
	
}

const errorHandler = ( message: string ) => { console.error(message) }



