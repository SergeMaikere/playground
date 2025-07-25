
/*=======================================
=            COMMAND PATTERN            =
=======================================*/

/**
 *
 * The Command pattern encapsulates actions as objects. Command objects 
 * allow for loosely coupled systems by separating the objects that 
 * issue a request from the objects that actually process the request. 
 * These requests are called events and the code that processes 
 * the requests are called event handlers.
 *
 */


/*----------  Commands  ----------*/

export interface Command {
	execute: (n1: number, n2: number) => number
	undo: (n1: number, n2: number) => number
	value: number
}


export class Add implements Command {

	execute = Operations.add
	undo = Operations.sub
	value: number

	constructor ( value: number ) {
		this.value = value
	}
}

export class Substrac implements Command {

	execute = Operations.sub
	undo = Operations.add
	value: number
	
	constructor ( value: number ) {
		this.value = value
	}
}

export class Multiply implements Command {

	execute = Operations.mul
	undo = Operations.div
	value: number
	
	constructor ( value: number ) {
		this.value = value
	}
}

export class Divide implements Command {

	execute = Operations.div
	undo = Operations.mul
	value: number
	
	constructor ( value: number ) {
		this.value = value
	}
}

/*----------  Receiver  ----------*/

class Operations {
	static add = (n1: number, n2: number) => n1 + n2
	static sub = (n1: number, n2: number) => n1 - n2
	static mul = (n1: number, n2: number) => n1 * n2
	static div = (n1: number, n2: number) => n1 / n2
}


/*----------  Invoker  ----------*/


export class Calculator {

	private commands: Command[] = []
	private current: number = 0

	execute = ( command: Command ) => {
		this.current = command.execute(this.current, command.value)
		this.commands.push(command)
		return this
	}

	undo = () => {
		if ( this.commands.length === 0 ) return this

		const command = this.commands.pop() as Command
		this.current = command.undo(this.current, command?.value)
		return this
	}

	getCurrentValue = () => this.current
}