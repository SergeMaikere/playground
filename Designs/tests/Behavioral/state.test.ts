import { describe, it } from 'mocha'
import { assert } from 'chai'
import Sinon, { SinonSandbox } from 'sinon'
import { TrafficLight } from '../../Behavioral/state'

let sandbox: SinonSandbox

const changesState = async () => {
	const trafficLight = new TrafficLight()
	const clock = sandbox.useFakeTimers(Date.now())
	const spy = sandbox.spy(console, 'log')
	trafficLight.start()
	await clock.tickAsync(50000)
	assert.equal( spy.callCount, 10 )
}

describe( 'State Pattern', 
	() => {
		beforeEach( () => sandbox = Sinon.createSandbox() )
		it( 'Changes state', changesState )
		afterEach( () => sandbox.restore() )
	}
)