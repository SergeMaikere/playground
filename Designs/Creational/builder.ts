import { faker } from '@faker-js/faker'
import V from '../validation'

/*======================================
=            BUILDER METHOD            =
======================================*/


export interface User {
	firstName: string
	lastName: string
	password: string
	email: string
}

export type UserData = {
	id: string
	firstName: string
	lastName: string
	password: string
	email: string
	birthday: Date | null
	key: string | null
	shopAddress: string | null
	contact_No: string | null
	address: string | null
}


export class Person {
	readonly id: string
	protected firstName: string
	protected lastName: string
	protected email: string
	protected password: string
	protected birthday: Date | null
	protected address: string | null
	protected contact_No: string | null
	protected shopAddress: string | null
	protected key: string | null
	protected isBuild: boolean

	constructor (userInfo: User) {
		this.id = faker.string.nanoid()
		this.firstName = userInfo.firstName
		this.lastName = userInfo.lastName
		this.email = userInfo.email
		this.password = userInfo.password
		this.birthday = null
		this.address = null
		this.shopAddress = null
		this.contact_No = null
		this.key = null
		this.isBuild = false
	}

	private resetIsBuild = () => {
		if ( this.isBuild ) !this.isBuild
	}

    fullName = () => `${this.firstName} ${this.lastName}` 

    setFirstName = (firstName: string) => {
    	this.resetIsBuild()
    	this.firstName = firstName
    	return this
    }

    setLastName = (lastName: string) => {
    	this.resetIsBuild()
    	this.lastName = lastName
    	return this
    }

	setBirthday = (date: Date): Person => {
		this.resetIsBuild()
		this.birthday = date
		return this
	}

	setEmail = (email: string): Person => {
		this.resetIsBuild()
		this.email = email
		return this
	}

	setPassword = (password: string): Person => {
		this.resetIsBuild()
		this.password = password
		return this
	}

	setAddress = (address: string): Person => {
		this.resetIsBuild()
		this.address = address
		return this
	}

	setShopAddress = (shopAddress: string): Person => {
		this.resetIsBuild()
		this.shopAddress = shopAddress
		return this
	}

	setContact = (contact_No: string): Person => {
		this.resetIsBuild()
		this.contact_No = contact_No
		return this
	}
	
	setKey = (key: string): Person => {
		this.resetIsBuild()
		this.key = key
		return this
	}

	build = () => {
		if ( !V.isValidName(this.firstName) || !V.isValidName(this.lastName) ) throw new Error('Name is invalid')
		if ( !V.isEmail(this.email) ) throw new Error('Email is invalid or absent')
		if ( !V.isPassword(this.password) ) throw new Error('Password is invalid or absent')
		if ( !V.isDate(this.birthday) ) throw new Error('Date is invalid or absent')
		
		this.isBuild = true
	}

	userInfo = (): UserData => {
		if ( !this.isBuild ) throw new Error('Person data are invalid')
		return {
			id: this.id,
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			password: this.password,
			birthday: this.birthday,
			address: this.address,
			contact_No: this.contact_No,
			shopAddress: this.shopAddress,
			key: this.key
		}
	}
}