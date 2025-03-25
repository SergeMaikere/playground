 import { EmployeeMatrice } from "./factory";

 const myUser = {
	firstName: 'James',
	lastName: 'Karuga',
	password: 'pasword1234',
	email: 'email@email.com',
	key: 'superadmin1234',
	shopAddress: null,
	contact_No: null,
	address: 'Address street 555'
}

const newGuy = new EmployeeMatrice('customer', myUser)

console.log(newGuy.info)