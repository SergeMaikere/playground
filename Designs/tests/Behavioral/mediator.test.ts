import { describe, it } from 'mocha'
import { assert } from 'chai'
import { Chatroom, Participant } from '../../Behavioral/mediator'
import { faker } from '@faker-js/faker'
import Sinon, { SinonSandbox } from 'sinon'

let sandbox: SinonSandbox
const msg = faker.lorem.paragraph()

const chat = new Chatroom()
const eddy = new Participant('Eddy')
const sophie = new Participant('Sophie')
const marc = new Participant('Marc')
const malaika = new Participant('Malaika')
const kofi = new Participant('Kofi')
const saadia = new Participant('Saadia')

const registers = () => {
	chat.register(eddy).register(sophie).register(marc).register(malaika).register(kofi)
	assert.equal( chat.userCount(), 5 )
}

const errorIfNoRegistered = () => {
	const spy = sandbox.spy(console, 'error')
	saadia.send(msg, kofi)
	assert.isTrue( spy.calledOnceWithExactly(`${saadia.name} is not registerd to a chatroom`) )
}

const sendsMessage = () => {
	const spy = sandbox.spy(console, 'log')
	eddy.send(msg, sophie)
	assert.isTrue( spy.calledTwice )
	assert.isTrue( spy.firstCall.calledWithExactly(`\nFrom: ${eddy.name} to ${sophie.name}`) )
	assert.isTrue( spy.lastCall.calledWithExactly(msg) )
}

const broadcasts = () => {
	const spy = sandbox.spy(console, 'log')
	malaika.send(msg)
	assert.equal( spy.callCount, 8 )
}

describe( 'Moderator Pattern',
	() => {
		beforeEach( () => sandbox = Sinon.createSandbox() )
		it( 'Chatroom registers participants', registers )
		it( 'Cannot send message if not registered', errorIfNoRegistered )
		it( 'Participant sends messages to participant', sendsMessage )
		it( 'Participant sends message to all participants', broadcasts )
		afterEach( () => sandbox.restore() )
	}
)