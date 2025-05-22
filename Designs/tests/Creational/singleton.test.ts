import { describe, it } from 'mocha'
import { assert } from 'chai'
import ConfigManager from '../../Creational/singleton'


const instantiate = () => {
	const config = new ConfigManager()
	return assert.instanceOf(config, ConfigManager)
}

const callConstructorMultipleTimes = () => {
	let test = new ConfigManager()
	test.set('plugins', ['HEAR ME OUT!'])
	
	return [...Array(4)]
	.map( _x => new ConfigManager() )
	.map( config => assert.deepEqual(test.settings, config.settings) )
}

const makeSingleton = () => {
	it('Instantiates class', instantiate)
	it('Always return same intance of class', callConstructorMultipleTimes)
}

describe('Should create a single instance of class', makeSingleton)