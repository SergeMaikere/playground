/*======================================
=            BRIDGE PATTERN            =
======================================*/

export type Recipient = {email?: string, phone?: string, deviceId?: string}


/*----------  Abstraction  ----------*/


export class NotificationSender {
	
	success = ( r: Recipient ): string => { throw new Error('The success method must be implemented') }

	message = ( msg: string, r: Recipient ): string => { throw new Error('The message method must be implemented') }

	send = ( message: string, recipient: Recipient ): string => {
		throw new Error('The send method must be implemented')
	}
}

/*----------  Implementation  ----------*/

export class EmailSender extends NotificationSender {

	success = ( r: Recipient ): string => `Email sucessfully sent to ${r.email}`

	message = ( msg: string, r: Recipient ) => `Sending email to ${r.email}: ${msg}`

	send = ( message: string, recipient: Recipient ): string => {
		console.log( this.message(message, recipient) )
		return this.success(recipient)
	}
}


export class SMSSender extends NotificationSender {

	success = ( r: Recipient ): string => `SMS sucessfully sent to ${r.phone}`

	message = ( msg: string, r: Recipient ) => `Sending sms to ${r.phone}: ${msg}`

	send = ( message: string, recipient: Recipient ): string => {
		console.log( this.message(message, recipient) )
		return this.success(recipient)
	}
}


export class PushSender extends NotificationSender {

	success = (r: Recipient): string => `Push notification sucessfully sent to ${r.deviceId}`

	message = ( msg: string, r: Recipient ) => `Sending notification to ${r.deviceId}: ${msg}`

	send = ( message: string, recipient: Recipient ): string => {
		console.log(this.message(message, recipient))
		return this.success(recipient)
	}
}


/*----------  Abstraction  ----------*/


class Notificator {

	readonly sender: NotificationSender

	constructor ( sender: NotificationSender ) {
		this.sender = sender
	}

	notify = ( message: string, recipient: Recipient ) => {
		return this.sender.send(message, recipient)
	}
}


/*----------  Implementation  ----------*/


export class NormalNotification extends Notificator {

	constructor ( sender: NotificationSender ) {
		super(sender)
	}

	notify = (message: string, recipient: Recipient) => {
		const formattedMessage = `Normal : ${message}`
		return this.sender.send(formattedMessage, recipient)
	}
}

export class UrgentNotification extends Notificator {

	constructor ( sender: NotificationSender ) {
		super(sender)
	}

	notify = (message: string, recipient: Recipient) => {
		const formattedMessage = `URGENT : ${message}`
		return this.sender.send(formattedMessage, recipient)
	}
}

export const SENDERS = [ EmailSender, SMSSender, PushSender ] as const
export type N = NormalNotification | UrgentNotification
type S = typeof SENDERS[number]