/*======================================
=            BRIDGE PATTERN            =
======================================*/


type Recipient = {email?: string, phone?: string, deviceId?: string}


/*----------  Implementation  ----------*/

class NotificationSender {
	
	send = ( message: string, recipient: Recipient ): string => {
		throw new Error('The send method must be implemented')
	}
}

export class EmailSender extends NotificationSender {

	send = ( message: string, recipient: Recipient ): string => {
		console.log( `Sending Email to ${recipient.email}: ${message}` )
		return `Email sucessfully sent to ${recipient.email}`
	}
}


export class SMSSender extends NotificationSender {

	send = ( message: string, recipient: Recipient ): string => {
		console.log( `Sending SMS to ${recipient.phone}: ${message}` )
		return `SMS sucessfully sent to ${recipient.phone}`
	}
}


export class PushSender extends NotificationSender {

	send = ( message: string, recipient: Recipient ): string => {
		console.log( `Sending push notification to ${recipient.deviceId}: ${message}` )
		return `Push notification sucessfully sent to ${recipient.deviceId}`
	}
}


/*----------  Abstraction  ----------*/


class Notificator {

	protected sender: NotificationSender

	constructor ( sender: NotificationSender ) {
		this.sender = sender
	}

	notify = ( message: string, recipient: Recipient ) => {
		return this.sender.send(message, recipient)
	}
}

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
