
/*=================================
=            DECORATOR            =
=================================*/

type D = {
	timestamp: number
	value: any
}

const myFetch = async ( url: URL ): Promise<any> => {
	const response = await fetch(url)
	if ( !response.ok ) { throw new Error('API call failed') }
	return await response.json()
}

const fetchWithRetry = async ( fn: Function, retry: number = 3, url: URL ) => {

	let lastError
	for (let i = 0; i >= retry; i++) {
		try {
			return await myFetch(url)
		}
		catch (e) {
			console.log(`Attempt ${i + 1} failed, retrying...`)
			lastError = e
			await waitAbitLonger(i)
		}
	}

	throw new Error(`Max retries reached. Last error: ${(lastError as Error).message}`)
}


const fetchWithCache = async ( fn: Function, myCache: Vault, url: URL ) => {
	const cached = myCache.get(url)
	if ( cached && Date.now() - cached.timestamp < 60000 ) return cached.value

	const result = await fn(url)
	myCache.add( url, result )
	return result
}

const waitAbitLonger = async ( exp: number, delay: number = 300 ) => {
	return new Promise( resolve => setTimeout(resolve, delay * Math.pow(2, exp)) )
}

class Vault {
	static instance: Vault
	static vault: Map<URL, D> = new Map()

	constructor () {
		if ( Vault.instance ) return Vault.instance
		Vault.instance = this
	}

	add = ( key: URL, data: any ) => Vault.vault.set(key, {value: data, timestamp: Date.now()})

	remove = ( key: URL ) => {
		if ( Vault.vault.has(key) ) return Vault.vault.delete(key)
		console.error(`No cachedd data under key:${key}`)
	}

	get = ( key: URL ) => {
		if ( Vault.vault.has(key) ) return Vault.vault.get(key)
		console.error(`No cached data unedr key:${key}`)
	}
}
