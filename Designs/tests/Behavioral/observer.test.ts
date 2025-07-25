import { describe, it } from 'mocha'
import { assert } from 'chai'
import { Display, WeatherStation } from '../../Behavioral/observer'
import Sinon from 'sinon'

const station = new WeatherStation()
const smartphone = new Display('Samsung Galaxy 4')
const tablet = new Display('Ipad Diamond S')
const smartTv = new Display('Philips Horizon X')

const addsObserver = () => {
	station.addObserver(smartphone)
	assert.equal( station.count(), 1 )
}

const removesObeserver = () => {
	station.removeObserver(smartphone.id)
	assert.equal( station.count(), 0 )
}

const getsNotified = () => {
	const spy = Sinon.spy(console, 'log')
	station.addObserver(smartphone).addObserver(tablet).addObserver(smartTv)
	station.setTemperature(22)

	smartphone.print()
	tablet.print()
	smartTv.print()

	assert.isTrue( spy.callCount === 3 )
	assert.isTrue( spy.firstCall.calledWithExactly(`${smartphone.name}: Temperature is 22°C`) )
	assert.isTrue( spy.secondCall.calledWithExactly(`${tablet.name}: Temperature is 22°C`) )
	assert.isTrue( spy.thirdCall.calledWithExactly(`${smartTv.name}: Temperature is 22°C`) )
	spy.restore()
}
 
describe( 'Observer Parttern', 
	() => {
		describe( 'Subject - Weather Stattion',
			() => {
				it( 'Adds observer', addsObserver )
				it( 'Removes observer', removesObeserver )
			}
		)

		describe( 'Observer - Displays',
			() => {
				it( 'Gets notified and updates itself', getsNotified )
			}
		)
	}
)