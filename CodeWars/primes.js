
class Primes {

	static * stream () {

		const MAX = 472882027
		const LIMIT = Math.floor(Math.sqrt(MAX)) + 1
		const RANGE = 1e4
		const PRIMES = this.#getCorePrimes(MAX)

		for ( let p of PRIMES ) yield p

		let currPrimes, newSieve, processedSieve, p

		let start = LIMIT
		let top = LIMIT + RANGE

		while (true) {

			newSieve = this.#getNewSieve(start, RANGE)
			processedSieve = this.#getSegmentedSieve(PRIMES, newSieve, start, top)
			currPrimes = this.#filterSieve(processedSieve, start, RANGE)

			for ( let p of currPrimes ) yield p

			start += RANGE
			top += RANGE
		}		
	}

	static #getCorePrimes = (max) => {
		let limit = Math.floor(Math.sqrt(max)) + 1
		let sieve = Array(limit + 1).fill(true).fill(false, 0, 2)

		for (let i = 2; i*i < limit; i++) {
			if ( sieve[i] ) {
				for (let j = i*i; j <= limit; j+=i) {
					sieve[j] = false
				}
			}
		}
		return this.#filterSieve(sieve, 0, limit)
	}

	static #getSegmentedSieve = (primes, sieve, start, top) => {
		let len = primes.length
		for (let i = 0; i < len; i++) {
			let f = this.#getFirstMultipleOfPrime(primes[i], start)

			for (let j = f; j <= top; j+=primes[i]) {
				sieve[j - start] = false
			}
		}
		return sieve
	}

	static #filterSieve = (sieve, start, limit) => {
		let primes = []
		for (let l = 0; l < limit; l++) {
			if ( sieve[l] ) primes.push(l + start)
		}
		return primes
	}

	static #getFirstMultipleOfPrime = (prime, start) => {
		let f = Math.floor(start / prime) * prime
		if ( f <= start ) f += prime
		return f
	}

	static #getNewSieve = (start, size) => start == 0 ? Array(size).fill(true).fill(false, 0, 2) : Array(size).fill(true)
}

const display = n => {
	let src = ''
	const stream = Primes.stream()
	for (let i = 0; i < n; i++) {
		src = `| ${stream.next().value}`
	}
	console.log({src})
}

display(2440)


