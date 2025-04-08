import { faker } from '@faker-js/faker'
import { Calculator, CalculatorAdapter, NewCalculator } from "./adapter";
import { EmailSender, NormalNotification, PushSender, SMSSender, UrgentNotification } from "./bridge";
import { MenuGroup, MenuMaker } from './composite';
import { addBio, addSocialMediaLinks, getBasicProfile } from './decorator';
import { pipe, curry } from '../helper'
import BlogDataFinder from './facade';
import { ComputerStock, FlyweightFactory } from './flyweight';


/*----------  Adapter  ----------*/

console.log('Adapter')
const old = new Calculator()
console.log(old.operations(5, 2,'james'))

const newC = new NewCalculator()
console.log(newC.sub(5, 2))

const adapter = new CalculatorAdapter()
console.log(adapter.operations(5, 2,'div'))

/*----------  Bridge  ----------*/

const emailSender = new EmailSender()
const smsSender = new SMSSender()
const pushSender = new PushSender()

const urgentEmail = new UrgentNotification(emailSender)
const normalSMS = new NormalNotification(smsSender)
const urgentPush = new UrgentNotification(pushSender)

const recipient = {
	email: faker.internet.email(),
	phone: faker.phone.number(),
	deviceId: faker.string.nanoid()
}
console.log('\nBridge')
urgentEmail.notify(faker.git.commitMessage(), recipient)
normalSMS.notify(faker.git.commitMessage(), recipient)
urgentPush.notify(faker.git.commitMessage(), recipient)


/*----------  Composite  ----------*/


const menuConfig = {
	type: 'group',
	name: 'Main Navigation',
	isExpanded: true,
	children: [
		{ type: 'item', name: 'Dashboard', url: '/dashboard', active: true },
		{ 
		  type: 'group', 
		  name: 'User Management',
		  isExpanded: false,
		  children: [
		    { type: 'item', name: 'View Users', url: '/users', active: false },
		    { type: 'item', name: 'Add User', url: '/users/new', active: false }
		  ]
		},
		{ type: 'item', name: 'Settings', url: '/settings', active: false }
	]
}

let menu = MenuMaker.create(menuConfig) as MenuGroup

console.log('\nComposite')
console.log(menu.render())
for ( const item of menu ) {
	console.log(item.name)
}

/*----------  Decorator  ----------*/

const myProfile = pipe(
	curry(addBio)(faker.lorem.sentences(3)), 
	curry(addSocialMediaLinks)([...Array(3)].map(i => faker.internet.domainName()))

)( getBasicProfile('James Bond', 'jbond@mi6.uk', faker.internet.url()) )

console.log('\nDecorator')
myProfile.display()


/*----------  Façade  ----------*/


const myPost = new BlogDataFinder('comments')
console.log('\nFacade')
myPost.get(5).then( post => console.log(post) )


/*----------  Flyweight  ----------*/

const computers = new ComputerStock()

computers.add("Dell", "Studio XPS", "Intel", "5G", "Y755P");
computers.add("Dell", "Studio XPS", "Intel", "6G", "X997T");
computers.add("Dell", "Studio XPS", "Intel", "2G", "U8U80");
computers.add("Dell", "Studio XPS", "Intel", "2G", "NT777");
computers.add("Dell", "Studio XPS", "Intel", "2G", "0J88A");
computers.add("HP", "Envy", "Intel", "4G", "CNU883701");
computers.add("HP", "Envy", "Intel", "2G", "TXU003283");

console.log('\nFlyweight')
console.log("Computers: " + computers.count());
computers.get('Y755P').print()
console.log("Flyweights: " + FlyweightFactory.count());