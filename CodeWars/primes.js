
class Primes {

	static * stream () {

		const MAX = 472882027
		const LIMIT = Math.floor(Math.sqrt(MAX)) + 1
		const RANGE = 15e3
		const SIEVE = Array(RANGE + 1).fill (true)
		const PRIMES = this.#getCorePrimes(LIMIT)

		let pLen = PRIMES.length
		for (let m = 0; m < pLen; m++) {
			yield PRIMES[m]
		}

		let currPrimes, newSieve, cLen, f, p

		let start = LIMIT
		let top = LIMIT + RANGE

		while (true) {
			newSieve = [...SIEVE]

			for (let i = 0; i < pLen; i++) {
				p = PRIMES[i]

				f = Math.floor(start / p) * p
				if ( f < start ) f += p

				for (let j = f; j <= top; j+=p) {
					newSieve[j - start] = false
				}
			}

			currPrimes = []
			for (let k = 0; k < RANGE; k++) {
				if ( newSieve[k] ) currPrimes.push(k + start)
			}

			cLen = currPrimes.length
			for (let l = 0; l < cLen; l++) {
				yield currPrimes[l]
			}

			start += RANGE
			top += RANGE
		}		
	}

	static #getCorePrimes = (limit) => {
		let newSieve = Array(limit + 1).fill(true).fill(false, 0, 2)

		for (let i = 2; i*i < limit; i++) {
			if ( newSieve[i] ) {
				for (let j = i*i; j <= limit; j+=i) {
					newSieve[j] = false
				}
			}
		}
		
		let primes = []
		for (let k = 0; k < limit; k++) {
			if ( newSieve[k] ) primes.push(k)
		}
		return primes
	}
}

const display = n => {
	let src = ''
	const stream = Primes.stream()
	for (let i = 0; i < n; i++) {
		// src = `| ${stream.next().value}`
		stream.next().value
	}
	// console.log({src})
}

display(25e6)


