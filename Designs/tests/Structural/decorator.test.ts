import { describe, it } from 'mocha'
import { assert } from 'chai'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon, { SinonSandbox } from 'sinon'
import { fetchWithCache, fetchWithRetry, myFetch, Vault } from '../../Structural/decorator'
import { curry, timeout } from '../../helper'

chai.use(chaiAsPromised)
const assertAsync = chai.assert
let sandbox: SinonSandbox

const URL = 'https://jsonplaceholder.typicode.com/posts/1'
const URL2 = 'https://jsonplaceholder.typicode.com/posts/2'
const BAD_URL = 'https://jsonplaceholder.typicode.com/posts/youknowimbad'
const lastError = 'Max retries reached. Last error: API call failed'
const expectedResult = {
	userId: 1,
	id: 1,
	title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
	body: 'quia et suscipit\n' +
    'suscipit recusandae consequuntur expedita et cum\n' +
    'reprehenderit molestiae ut ut quas totam\n' +
    'nostrum rerum est autem sunt rem eveniet architecto'
}

const expectedResult2 = {
  userId: 1,
  id: 2,
  title: 'qui est esse',
  body: 'est rerum tempore vitae\n' +
    'sequi sint nihil reprehenderit dolor beatae ea dolores neque\n' +
    'fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\n' +
    'qui aperiam non debitis possimus qui neque nisi nulla'
}

const cache = new Vault()
const myRetryFn = curry(fetchWithRetry)(myFetch, 3)
const myCacheFn = curry(fetchWithCache)(myFetch, cache)

const fetchesData = ( fn: Function, url: string ) => {
	return async () => {
		const result = await fn(url)
		assert.deepEqual(result, expectedResult)
	}
}

const throwsError = ( fn: Function, errorMsg: string ) => () => assertAsync.isRejected( fn(BAD_URL), errorMsg )

const retries = async () => {
	const spy = sandbox.spy(console, 'log')
	try {
		await myRetryFn(BAD_URL)
	} catch (e) {
		assert.isTrue( spy.calledThrice )
		assert.isTrue( spy.thirdCall.calledWithExactly('Attempt 3 failed, retrying...') )
	}
}

const caches = async () => {
	const spy = sandbox.spy(cache, 'add')
	await myCacheFn(URL2)
	assert.isTrue( spy.calledOnce )
	assert.isTrue( spy.calledWithExactly( URL2, expectedResult2) )
}

const fetchesFromCache = async() => {
	const spy = sandbox.spy(console, 'log')
	await myCacheFn(URL)
	assert.isTrue( spy.calledOnceWithExactly('Cache Hit for ' + URL) )
}

const goesBackToAPI = async () => {
	const clock = sandbox.useFakeTimers(Date.now())
	const spy = sandbox.spy(console, 'log')
	timeout(60000)
	myCacheFn(URL2)
	assert.isTrue( spy.calledOnceWithExactly('Lets call the API') )
	await clock.tickAsync(60000)
}

describe( 'Decorator Pattern',
	() => {
		beforeEach( () => sandbox = sinon.createSandbox() )

		describe( 'Basic Fetch function',
			() => {
				it( 'Fetches the data', fetchesData(myFetch, URL) )
				it( 'Throws error when cannot fetch', throwsError(myFetch, 'API call failed') )
			}
		)

		describe( 'Fetch function with retries',
			() => {
				it( 'Fetches the data', fetchesData(myRetryFn, URL) )
				it( 'Retries when it failes', retries )
				it( 'Throws error when cannot fetch', throwsError(myRetryFn, lastError) )
			}
		)

		describe( 'Fetch function with cache',
			() => {
				it( 'Fetches the data', fetchesData(myCacheFn, URL) )
				it( 'Caches the newly called data', caches )
				it( 'Fetches data from cache', fetchesFromCache )
				it( 'Fetches from API after 1 min', goesBackToAPI )
			}
		)

		afterEach( () => sandbox.restore() )
	}
)