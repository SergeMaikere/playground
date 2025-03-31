import { faker } from '@faker-js/faker'
import { Calculator, CalculatorAdapter, NewCalculator } from "./adapter";
import { EmailSender, NormalNotification, PushSender, SMSSender, UrgentNotification } from "./bridge";


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
