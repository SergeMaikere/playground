import { Person, User, UserInput } from '../../Creational/builder'
import { describe, it } from 'mocha'
import { assert } from 'chai'

const user: User = {
	firstName: 'Horus',
	lastName: 'Lupercal',
	password: 'DaddyDearest',
	email: 'chaosBoy16@chaosunited.wp',
}

const dude = new Person(user)

const userInfos: UserInput = {
	...user,
	id: dude.id,
	birthday: null,
	key: null,
	shopAddress: null,
	contact_No: null,
	address: null
}


const buildBasicperson = () => assert.deepEqual( userInfos, dude.build()?.userInfo() )

const addsInfos = ( userInfos: UserInput, person: Person ) => assert.deepEqual( userInfos, person.build()?.userInfo() )

const addsBirthday = () => {
	const date = new Date('05/04/1988')
	return addsInfos({...dude.userInfo(), birthday: date}, dude.setBirthday(date))
}

const addsAddress = () => {
	const address = 'Throne room Vengeful Spirit'
	return addsInfos({...dude.userInfo(), address}, dude.setAddress(address))
}

const addsShopAddress = () => {
	const shopAddress = 'Opening soon at the Imperial Palace Terra'
	return addsInfos({...dude.userInfo(), shopAddress}, dude.setShopAddress(shopAddress))
}

const addsKey = () => {
	const key = 'fuckErebus'
	return addsInfos({...dude.userInfo(), key}, dude.setKey(key))
}

const addsContact = () => {
	const contact_No = '999-888-737-666'
	return addsInfos({...dude.userInfo(), contact_No}, dude.setContact(contact_No))
}

const failsBuild = ( person: Person, message: string ) => assert.throw( () => person.build(), message )

const invalidEmail = () => failsBuild(dude.setEmail(''), 'Email is invalid or absent')
const invalidName = () => failsBuild(dude.setEmail('chaosBoy16@chaosunited.wp').setLastName(''), 'Name is invalid or absent')
const invalidPassword = () => failsBuild(dude.setLastName('Lupercal').setPassword(''), 'Password is invalid or absent')

const buildPerson = () => {
	it('builds a basic person', buildBasicperson)
	it('adds a birthday', addsBirthday)
	it('adds a address', addsAddress)
	it('adds a shopAddress', addsShopAddress)
	it('adds a key', addsKey)
	it('adds a contact number', addsContact)
	it('Should fail to build with invalid email', invalidEmail)
	it('Should fail to build with invalid name', invalidName)
	it('Should fail to build with invalid password', invalidPassword)
}

describe( 'Builder Pattern', () => describe('Should build a Person object', buildPerson) )