import { describe, it } from 'mocha'
import { assert } from 'chai'
import { Computer, ComputerStock, FlyweightFactory } from '../../Structural/flyweight'

const flyweight = { make: 'Dell', model: '9.2', processor: 'Intel' }
const computer1 = { ...flyweight, memory: 'extensive', tag: '14VDDA' }
const computer2 = { ...flyweight, memory: 'basic', tag: 'SPEEDWAGON' }
const computer3 = { ...flyweight, memory: 'massive', tag: 'WOULA' }

const makesFlyweight = () => {
	FlyweightFactory.get(flyweight)
	assert.equal( FlyweightFactory.count(), 1 )
}

const makesComputer = () => {
	const myPc = new Computer(computer1 )
	assert.instanceOf( myPc, Computer )
	assert.deepEqual( myPc.flyweight, FlyweightFactory.get(flyweight) )
}

const addsComputerToStock = () => {
	const myStock = new ComputerStock()
	myStock.add(computer1)
	assert.equal(myStock.count(), 1)
}

const makesNoDuplicates = () => {
	const myStock = new ComputerStock()
	myStock.add(computer1)
	myStock.add(computer2)
	myStock.add(computer3)
	assert.equal(myStock.count(), 3)
	assert.equal(FlyweightFactory.count(), 1)
}

describe( 'Flyweight Pattern',
	() => {
		it( 'Makes flyweight-computer', makesFlyweight )
		it( 'Makes computers', makesComputer )
		it( 'Adds computers to Stock', addsComputerToStock )
		it( 'Makes no duplicate flyweight', makesNoDuplicates )
	}
)