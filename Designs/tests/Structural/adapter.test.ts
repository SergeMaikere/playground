import { describe, it } from 'mocha'
import { assert } from 'chai'
import { Calculator, NewCalculator, CalculatorAdapter } from '../../Structural/adapter'

const calculate = (calculator: Calculator) => {
	return () => {
		assert.equal(calculator.operations(40, 2, 'add'), 42)
		assert.equal(calculator.operations(100, 58, 'sub'), 42)
		assert.equal(calculator.operations(6, 7, 'mult'), 42)
		assert.equal(calculator.operations(420, 10, 'div'), 42)
	}
}

const newCalculate = () => {
	const newC = new NewCalculator()
	assert.equal(newC.addition(40, 2), 42)
	assert.equal(newC.substraction(100, 58), 42)
	assert.equal(newC.multiplication(6, 7), 42)
	assert.equal(newC.division(420, 10), 42)
}

const makeBasicCalculator = () => {
	const basic = new Calculator()
	it('Create calculator', () => assert.instanceOf(basic, Calculator))
	it('Performs all basic operations', calculate(basic)) 
}

const makesNewCalculator = () => {
	const newC = new NewCalculator()
	it('Create calculator', () => assert.instanceOf(newC, NewCalculator))
	it('Performs all basic operations', newCalculate) 
}

const makesCalculatorAdapter = () => {
	const adapter = new CalculatorAdapter()
	it('Creates calculator adapter', () => assert.instanceOf(adapter, CalculatorAdapter))
	it('Calls basic but uses new', calculate(adapter))
}

describe('Adapter Pattern',
	() => {
		describe('Makes basic calculator', makeBasicCalculator)
		describe('Makes new Calculator', makesNewCalculator)
		describe('Makes Calculator adapter', makesCalculatorAdapter)
	}
)