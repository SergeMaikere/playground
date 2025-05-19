import { assert } from 'chai'
import { describe, it } from 'mocha' 
import { EmployeeMatrice } from '../../Creational/factory'

const user = {
	id: '87945123356JDHKH',
	firstName: 'Benjamin',
	lastName: 'Button',
	password: 'tooYoungForhisShit',
	email: 'benji@caramil.com',
	birthday: null,
	key: null,
	shopAddress: null,
	contact_No: null,
	address: null
}

const userInfo = {
	name: 'Benjamin Button',
	password: 'tooYoungForhisShit',
	email: 'benji@caramil.com'
}

const makeAdmin = () => {
	const key = '123456789X'
	const admin = EmployeeMatrice.create('admin', {...user, key})
	assert.deepEqual(admin.info, {...userInfo, key})
}

const makeCustomer = () => {
	const address = '555 Somewhere Road, 175XB Boston Texas'
	const admin = EmployeeMatrice.create('customer', {...user, address})
	assert.deepEqual(admin.info, {...userInfo, address})
}

const makeSeller = () => {
	const sellerInfo = {
		shopAddress: '555 Somewhere Road, 175XB Boston Texas',
		contact_No: 'NANANAFOFONAFOFA'
	}

	const admin = EmployeeMatrice.create('seller', {...user, ...sellerInfo})
	assert.deepEqual(admin.info, {...userInfo, ...sellerInfo})
}


const employeeMaker = () => {
	it('Should make an Admin type Employee', makeAdmin)
	it('Should make an Customer type Employee', makeCustomer)
	it('Should make an Seller type Employee', makeSeller)
}

describe('Employee Factory', employeeMaker)
