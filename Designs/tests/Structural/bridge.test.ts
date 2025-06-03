import { describe, it } from 'mocha'
import { assert } from 'chai'
import sinon from 'sinon'
import { EmailSender, NormalNotification, PushSender, Recipient, SMSSender, UrgentNotification, N, SENDERS, NotificationSender } from '../../Structural/bridge'

type S = typeof SENDERS[number]

const recipient = {
	email: "horusL@imperium.terra",
	phone: '999-888-737-666',
	deviceId: '781df56sdsf'
}


const makeSender = () => {
	it('Makes email sender', () => assert.instanceOf(new EmailSender(), EmailSender))
	it('Makes sms sender', () => assert.instanceOf(new SMSSender(), SMSSender))
	it('Makes push sender', () => assert.instanceOf(new PushSender(), PushSender))
}

const makesNotificator = ( notifier: N ) => {
	return () => {
		assert.instanceOf(notifier, notifier instanceof NormalNotification ? NormalNotification : UrgentNotification)
	}
}

const sendsNotification = ( notifier: N, msg: string, r: Recipient ) => {
	return () => assert.equal(notifier.notify(msg, r), notifier.sender.success(r)) 
}

const sendsCorrectMsg = ( notifier: N, msg: string, r: Recipient ) => {
	return () => {
		const spy = sinon.spy(console, 'log')
		notifier.notify(msg, r)
		assert.isTrue( spy.calledWithExactly(notifier.sender.message(msg, r)) )
		spy.restore
	}
}


const setNotifiers = ( type: string ): N[] => {
	return SENDERS.map( 
		s => type === 'normal' ? new NormalNotification(new s()) : new UrgentNotification(new s()) 
	)
}

const makesNotifications = ( notifierKind: string ) => {
	const msg = 'Lorem ipsum dolor sit'
	const [ emailNotifier, smsNotifier, pushNotifier ] = setNotifiers(notifierKind)

	return () => {
		it( 'Makes email notificator', () => makesNotificator(emailNotifier) )
		it( 'Sends email notification', () => sendsNotification(emailNotifier, msg, recipient) )
		it( 'Sends the correct email', () => sendsCorrectMsg(emailNotifier, msg, recipient) )
		
		it( 'Makes sms notificator', () => makesNotificator(smsNotifier) )
		it( 'Sends sms notification', () => sendsNotification(smsNotifier, msg, recipient) )
		it( 'Sends the correct sms', () => sendsCorrectMsg(emailNotifier, msg, recipient) )

		it( 'Makes push notificator', () => makesNotificator(pushNotifier) )
		it( 'Sends push notification', () => sendsNotification(pushNotifier, msg, recipient) )
		it( 'Sends the correct notification', () => sendsCorrectMsg(emailNotifier, msg, recipient) )		
	}
}	

describe('Bridge Pattern', 
	() => {
		describe('Makes senders', makeSender)
		describe('Makes normal notifications', makesNotifications('normal'))
		describe('Makes urgent notifications', makesNotifications('urgent'))
	}
)