import { EmployeeMatrice } from "./factory";
import { Person } from "./builder";
import { faker } from '@faker-js/faker'
 import { config1, config2 } from "./singleton";


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


const newGuy = EmployeeMatrice.create('seller', userInfo)

console.log(newGuy.info)

console.log(config1 === config2)