/*===============================
=            ADAPTER            =
===============================*/

type Operation = (n1: number, n2: number) => number

export class Calculator {

	operations: (n1: number, n2: number, op: string) => number

	constructor () {
		this.operations = this.calculate
	}

	protected calculate = ( n1: number, n2: number, operation: string ): number => {
		if ( operation === 'add' ) return n1 + n2
		if ( operation === 'sub' ) return n1 - n2
		if ( operation === 'mult' ) return n1 * n2
		if ( operation === 'div' ) return n1 / n2
		return NaN
	}
}


export class NewCalculator {

	add: Operation
	sub: Operation
	mult: Operation
	div: Operation

	constructor () {
		this.add = this.addition
		this.sub = this.substraction
		this.mult = this.multiplication
		this.div = this.division
	}

	addition = (n1: number, n2: number): number => n1 + n2
	substraction = (n1: number, n2: number): number => n1 - n2
	multiplication = (n1: number, n2: number): number => n1 * n2
	division = (n1: number, n2: number): number => n1 / n2
}

export class CalculatorAdapter extends Calculator {
	
	newCalculator: NewCalculator

	constructor () {
		super()
		this.newCalculator = new NewCalculator()
	}

	protected calculate = ( n1: number, n2: number, operation: string ): number => {
		if ( operation === 'add' ) return this.newCalculator.add(n1, n2)
		if ( operation === 'sub' ) return this.newCalculator.sub(n1, n2)
		if ( operation === 'mult' ) return this.newCalculator.mult(n1, n2)
		if ( operation === 'div' ) return this.newCalculator.div(n1, n2)
		return NaN
	}
}
