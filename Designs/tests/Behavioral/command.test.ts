import { describe, it } from 'mocha'
import { assert } from 'chai'
import { Add, Calculator, Command, Divide, Multiply, Substrac } from '../../Behavioral/command'

const myCalc = new Calculator

const executeCommand = ( command: Command, expected: number ) => {
	return () => {
		myCalc.execute(command)
		assert.equal( myCalc.getCurrentValue(), expected )
	}
}

const undoAll = () => {
	myCalc.undo().undo().undo().undo()
	assert.equal( myCalc.getCurrentValue(), 0 )
}

describe( 'Command Pattern',
	() => {
		it( 'Makes additions', executeCommand(new Add(5), 5) )
		it( 'Makes substractions', executeCommand(new Substrac(3), 2) )
		it( 'Makes multiplications', executeCommand(new Multiply(10), 20) )
		it( 'Makes divisions', executeCommand(new Divide(4), 5) )
		it( 'Undoes commands', undoAll  )
	}
)