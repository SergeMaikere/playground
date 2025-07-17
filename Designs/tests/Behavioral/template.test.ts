import { describe, it } from 'mocha'
import { assert } from 'chai'
import { NumberProcessor } from '../../Behavioral/template'
import Sinon, { SinonSandbox } from 'sinon'

let sandbox: SinonSandbox
const nProcessor = new NumberProcessor()
const numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
const processed = { sum:55, avg: 5.5, min: 1, max: 10, count: 10 }
const now = Date.now()
const expected = { formated: JSON.stringify(processed), timestamp: now, stored: false }

const invalid = () => {
	const spy = sandbox.spy(console, 'error')
	nProcessor.runProcess('Hello World')
	assert.isTrue( spy.callCount === 2 )
	assert.isTrue( spy.secondCall.calledWith('Data process was a failure') )
}

const processNumbers = () => {
	const result = nProcessor.runProcess(numbers)
	assert.deepEqual(result, processed)
}

const formates = () => {
	sandbox.stub(Date, 'now').returns(now)
	nProcessor.isFormatable = true
	assert.deepEqual( nProcessor.runProcess(numbers), expected )
}
const stores = () => {
	sandbox.stub(Date, 'now').returns(now)
	nProcessor.isStorable = true
	assert.deepEqual( nProcessor.runProcess(numbers), {...expected, stored: true} )
}
const notifies = () => {
	const spy = sandbox.spy(console, 'log')
	nProcessor.runProcess(numbers)
	assert.isTrue( spy.lastCall.calledWith('Data process was a success') ) 

}

describe( 'Template Pattern',
	() => {
		beforeEach( () => sandbox = Sinon.createSandbox() )

		it( 'Notifies if invalid input', invalid )
		it( 'Porcesses numbers', processNumbers )
		it( 'formates result', formates )
		it( 'Stores result', stores )
		// it( 'Notifies success', notifies )

		afterEach( () => sandbox.restore() )
	}
)