/*=================================
=            DECORATOR            =
=================================*/

import { timeout } from "../helper"

type D = {
	timestamp: number
	value: any
}

export const myFetch = async ( url: string ): Promise<any> => {
	const response = await fetch(url)
	if ( !response.ok ) { throw new Error('API call failed') }
	return await response.json()
}

export const fetchWithRetry = async ( fn: Function, retry: number, url: string ) => {
	let lastError
	for (let i = 0; i < retry; i++) {
		try {
			return await fn(url)
		} catch (e) {
			console.log(`Attempt ${i + 1} failed, retrying...`)
			lastError = e
			await waitAbitLonger(i, 200)
		}
	}
	throw new Error(`Max retries reached. Last error: ${(lastError as Error).message}`)
}


export const fetchWithCache = async ( fn: Function, cache: Vault, url: string ) => {
	const cached = cache.get(url)

	if ( cached && itsOnlyBeenAFewSeconds(cached.timestamp) ) {
		console.log('Cache Hit for ' + url)
		return cached.value
	}

	console.log('Lets call the API')
	const result = await fn(url)
	cache.add( url, result )
	return result
}

const itsOnlyBeenAFewSeconds = ( timestamp: number, max: number = 60000 ) => Date.now() - timestamp < max

const waitAbitLonger = async ( exp: number, delay: number = 300 ) => {
	return timeout(delay * Math.pow(2, exp))
}

export class Vault {
	private static instance: Vault
	private static repository: Map<string, D> = new Map()

	constructor () {
		if ( Vault.instance ) return Vault.instance
		Vault.instance = this
	}

	add = ( key: string, data: any ) => Vault.repository.set(key, {value: data, timestamp: Date.now()})

	remove = ( key: string ) => {
		if ( Vault.repository.has(key) ) return Vault.repository.delete(key)
		console.error(`No cachedd data under key: ${key}`)
	}

	get = ( key: string ) => {
		if ( Vault.repository.has(key) ) return Vault.repository.get(key)
		console.error(`No cached data under key: ${key}`)
	}
}
