import { faker } from '@faker-js/faker'
import { Calculator, CalculatorAdapter, NewCalculator } from "./adapter";
import { EmailSender, NormalNotification, PushSender, SMSSender, UrgentNotification } from "./bridge";
import { MenuGroup, MenuMaker } from './composite';


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