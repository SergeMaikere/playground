
class Primes {

	static * stream () {
		const MAX = 472882028
		const LIMIT = Math.floor(Math.sqrt(MAX))
		const RANGE = Array(LIMIT+1).fill(true)
		const PRIMES = this.getCorePrimes(RANGE, LIMIT)

		let start = 0
		let top = LIMIT
		let currPrimes = PRIMES

		while (start <= MAX) {

			if (top > MAX) top = MAX

			if (start >= LIMIT) { 
				currPrimes = this.getSegmentedSievePrimes(start, top, [...RANGE], PRIMES, LIMIT)
			}

			const len = currPrimes.length
			for (let i = 0; i < len; i++) {
				yield currPrimes[i]
			}

			start += LIMIT
			top += LIMIT
		}

	}

	static getCorePrimes (range, limit) { 
		let temp = [...range]
		temp.fill(false, 0, 2)

		for (let p = 2; p*p < limit; p++) {
			if (temp[p]) {
				for (let i = p*p; i <= limit; i+=p) {
					temp[i] = false
				}
			}
		}
		return this.filterMultiples(0, temp, limit)
	}

	static getSegmentedSievePrimes (start, top, sieve, primes, limit) {
		let f, p

		const len = primes.length
		for (let i = 0; i < len; i++) {
			p = primes[i]
			
			f = this.getFirstMultiple(start, p)

			for (let j = f; j <= top; j+=p) {
				sieve[j - start] = false
			}
		}
		return this.filterMultiples(start, sieve, limit)
	}

	static filterMultiples (offset, sieve, limit) {
		let result = []
		for (let i = 0; i < limit; i++) {
			if (sieve[i]) result.push(i + offset)
		}
		return result
	}

	static getFirstMultiple (start, prime) {
		let result = Math.floor( start / prime ) * prime
		if ( result < start ) result += prime
		return result
	}
}


const deliverPrimes = n => {
	const stream = Primes.stream()
	for (let i = 0; i < n; i++) {
		stream.next()
	}
}

deliverPrimes(25e6)