import { faker } from "@faker-js/faker";
import { Add, Calculator, Divide, Multiply, Substrac } from "./command";
import { Chatroom, Participant } from "./mediator";
import { Display, WeatherStation } from "./observer";
import { Dude, DudeFacade } from "./memento";

const myCalculator = new Calculator()

myCalculator
.execute(new Add(100))
.execute(new Substrac(50))
.execute(new Multiply(4))
.execute(new Add(48))
.undo()
.execute(new Divide(2))

console.log('\nCommand')
console.log(myCalculator.getCurrentValue())


const weather9 = new WeatherStation()
const device1 = new Display('Homer Tab')
const device2 = new Display('Homer Smartphone')
const device3 = new Display('Homer Tv')
const device4 = new Display('Homer Smartwatch')

console.log('\nObserver')
weather9
.addObserver(device1)
.addObserver(device2)
.addObserver(device3)
.setTemperature(13)

console.log('\n')
weather9
.removeObserver(device2)
.addObserver(device4)
.setTemperature(19)

console.log('\nMediator')

const caramail = new Chatroom()
const yoko = new Participant("Yoko");
const john = new Participant("John");
const paul = new Participant("Paul");
const ringo = new Participant("Ringo");
const ringo2 = new Participant("Ringo");

ringo.send('Hello World')

caramail
.register(yoko)
.register(john)
.register(paul)
.register(ringo)

yoko.send("All you need is love.")
yoko.send("I love you John.")
john.send("Hey, no need to broadcast", yoko)
paul.send("Ha, I heard that!")
ringo.send("Paul, what do you think?", paul)

console.log('\nMementos')

const makeRandomDude = () => (
	 {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		email: faker.internet.email(),
		password: faker.string.alphanumeric(16),
	}
)

const handler = new DudeFacade()

const dudes = [ makeRandomDude(), makeRandomDude(), makeRandomDude() ]
.map( d => new Dude(d) )
.map( d => {d.setBirthday(faker.date.birthdate()); return d} )
.map( d => {handler.build(d); return d} )

handler.print()

dudes
.map( d => {d.setEmail(faker.internet.email()); return d} )
.map( d => {console.log(d.userInfo().email); return d} )
.map( d => {handler.rollBack(d); return d} )
.forEach( d => console.log(d.userInfo().email) )



