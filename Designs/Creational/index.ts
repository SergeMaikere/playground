 import { EmployeeMatrice } from "./factory";
 import { faker } from '@faker-js/faker'
 import { Person } from "./builder";

const getAddress = () => {
	const f = faker.location
	return `${f.streetAddress()}, ${f.zipCode()} ${f.city()}}`
}

const input = {
	firstName: faker.person.firstName(),
	lastName: faker.person.lastName(),
	email: faker.internet.email(),
	password: faker.string.nanoid(),
}

let userInfo = new Person(input)
.setBirthday(faker.date.birthdate())
.setAddress(getAddress())
.setShopAddress(getAddress())
.setContact(faker.phone.number({style: 'human'}))
.setKey(faker.string.alphanumeric(32))
.build()


const newGuy = new EmployeeMatrice('seller', userInfo)

console.log(newGuy.info)