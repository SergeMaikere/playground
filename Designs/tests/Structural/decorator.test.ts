import { describe, it } from 'mocha'
import { assert } from 'chai'
import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon, { SinonSandbox } from 'sinon'
import { fetchWithCache, fetchWithRetry, myFetch, Vault } from '../../Structural/decorator'
import { curry } from '../../helper'

chai.use(chaiAsPromised)
const assertAsync = chai.assert
let sandbox: SinonSandbox

const URL = 'https://jsonplaceholder.typicode.com/posts/1'
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


const cache = new Vault()
const myRetryFn = curry(fetchWithRetry)(myFetch, 3)
const myCacheFn = curry(fetchWithCache)(myFetch, cache)
const myRetryCacheFn = curry(fetchWithCache)(myRetryFn, cache)

const fetchesData = ( fn: Function, url: string ) => {
	return async () => {
		const result = await fn(url)
		assert.deepEqual(result, expectedResult)
	}
}

const throwsError = ( fn: Function, errorMsg: string ) => () => assertAsync.isRejected( fn(BAD_URL), errorMsg )

const retries = ( fn: Function, n: number ) => {
	return async () => {
		const spy = sandbox.spy(console, 'log')
		try {
			await fn(BAD_URL)
		} catch (e) {
			assert.equal( spy.callCount, n )
			assert.isTrue( spy.lastCall.calledWithExactly('Attempt 3 failed, retrying...') )
		}
	}
}

const caches = ( fn: Function ) => {
	return async () => {
		const spy = sandbox.spy(cache, 'add')
		
		cache.remove(URL)
		await fn(URL)
		
		assert.isTrue( spy.calledOnce )
		assert.isTrue( spy.calledWithExactly( URL, expectedResult) )
	}
}

const fetchesFromCache = ( fn: Function ) => {
	return async () => {
		const spy = sandbox.spy(console, 'log')
		await fn(URL)
		assert.isTrue( spy.calledOnceWithExactly('Cache Hit for ' + URL) )
	}
}

const goesBackToAPI = ( fn: Function ) => {
	return async ()  => {
		const clock = sandbox.useFakeTimers(Date.now())
		setTimeout( () => console.log('It has been a minute'), 60000 )
		clock.tick(60000)
		
		const spy = sandbox.spy(console, 'log')
		fn(URL)
		assert.isTrue( spy.calledOnceWithExactly('Lets call the API') )
	}
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
				it( 'Retries when it failes', retries(myRetryFn, 3) )
				it( 'Throws error when cannot fetch', throwsError(myRetryFn, lastError) )
			}
		)

		describe( 'Fetch function with cache',
			() => {
				it( 'Fetches the data', fetchesData(myCacheFn, URL) )
				it( 'Caches the newly called data', caches(myCacheFn) )
				it( 'Fetches data from cache', fetchesFromCache(myCacheFn) )
				it( 'Fetches from API after 1 min', goesBackToAPI(myCacheFn) )
			}
		)

		describe( 'Fetch function with cache and retries', 
			() => {
				it( 'fetches the data', fetchesData(myRetryCacheFn, URL) )
				it( 'Retries when it failes', retries(myRetryCacheFn, 4) )
				it( 'Throws error when cannot fetch', throwsError(myRetryCacheFn, lastError) )
				it( 'Caches the newly called data', caches(myRetryCacheFn) )
				it( 'Fetches data from cache', fetchesFromCache(myRetryCacheFn) )
				it( 'Fetches from API after 1 min', goesBackToAPI(myRetryCacheFn) )
			}
		)

		afterEach( () => sandbox.restore() )
	}
)