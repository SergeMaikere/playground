import { describe, it } from 'mocha'
import { assert } from 'chai'
import { Dude, DudeBackUp } from '../../Behavioral/memento'
import { faker } from '@faker-js/faker'
import Sinon from 'sinon'


export const getRandomDude = () => {
	const dude =  new Dude(
		{
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			password: faker.internet.password(),
			email: faker.internet.email()
		}
	)
	dude.setAddress( faker.location.streetAddress() )
	.setBirthday( faker.date.birthdate() )
	.setContact( faker.phone.number() )
	.setKey( faker.string.uuid() )
	.setShopAddress( faker.location.secondaryAddress() )
	.build()

	return dude
}

const dude = getRandomDude()
const json = JSON.stringify(dude.userInfo())
const careTaker = new DudeBackUp()

const makesMemento = () => {
	const expected = {key: dude.id, json}
	assert.deepEqual( dude.createMemento(), expected )
}

const restores = () => {
	dude.setBirthday( faker.date.birthdate() )
	assert.notEqual( JSON.stringify(dude.userInfo()), json )
	dude.restoreMemento(json)
	assert.equal( JSON.stringify(dude.userInfo()), json )
}

const addsBackup = () => assert.isTrue( careTaker.add({key: dude.id, json}) )

const retrieveBackup = () => assert.equal( careTaker.get(dude.id), json )

describe( 'Memento Pattern', 
	() => {
		describe( 'Originator - Dude',
			() => {
				it( 'Makes a memento', makesMemento )
				it( 'Restores originator to memento state', restores )
			}
		)

		describe( 'Caretaker - Dude backup',
			() => {
				it( 'Adds memento to backup', addsBackup )
				it( 'Retrieves memento from backup', retrieveBackup )
			}
		)
	}
)