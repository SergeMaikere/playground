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

export type UserInput = {
	firstName: string
	lastName: string
	password: string
	email: string
	birthday: Date
	key: string | null
	shopAddress: string | null
	contact_No: string | null
	address: string | null
}


export class Person {
	protected firstName: string
	protected lastName: string
	protected email: string
	protected password: string
	protected birthday: Date | null
	protected address: string | null
	protected contact_No: string | null
	protected shopAddress: string | null
	protected key: string | null


	constructor (userInfo: User) {
		this.firstName = userInfo.firstName
		this.lastName = userInfo.lastName
		this.email = userInfo.email
		this.password = userInfo.password
		this.birthday = null
		this.address = null
		this.shopAddress = null
		this.contact_No = null
		this.key = null
	}

	setBirthday = (date: Date): Person => {
		this.birthday = date
		return this
	}

	setEmail = (email: string): Person => {
		this.email = email
		return this
	}

	setPassword = (password: string): Person => {
		this.password = password
		return this
	}

	setAddress = (address: string): Person => {
		this.address = address
		return this
	}

	setShopAddress = (shopAddress: string): Person => {
		this.shopAddress = shopAddress
		return this
	}

	setContact = (contact_No: string): Person => {
		this.contact_No = contact_No
		return this
	}
	
	setKey = (key: string): Person => {
		this.key = key
		return this
	}

	build = (): UserInput => {
		if ( !V.isValidName(this.firstName) || !V.isValidName(this.lastName) ) throw new Error('Name is invalid')
		if ( !V.isEmail(this.email) ) throw new Error('Email is invalid or absent')
		if ( !V.isPassword(this.password) ) throw new Error('Password is invalid or absent')
		if ( !V.isDate(this.birthday) ) throw new Error('Date is invalid or absent')
		
		return {
			firstName: this.firstName, 
			lastName: this.lastName, 
			password: this.password as string, 
			email: this.email as string, 
			birthday: this.birthday as Date, 
			key: this.key, 
			shopAddress: this.shopAddress, 
			contact_No: this.contact_No, 
			address: this.address 
		}
	}
}