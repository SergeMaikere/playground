
class Primes {

	static * stream () {
		const MAX = 472882028
		const LIMIT = Math.floor(Math.sqrt(MAX))
		const RANGE = Array(LIMIT+1).fill(true)
		const SIEVE = this.setSieve(RANGE, LIMIT)
		const PRIMES = this.filterMultiples(0, SIEVE, LIMIT)

		let start = 0
		let top = LIMIT
		let currSieve = PRIMES
		let sieveSeg

		while (start <= MAX) {

			if (top > MAX) top = MAX

			if (start >= LIMIT) { 
				sieveSeg = this.setSieveSegment(start, top, sieveSeg, RANGE, PRIMES)
				currSieve = this.filterMultiples(start, sieveSeg, LIMIT)
			}

			const len = currSieve.length
			for (let i = 0; i < len; i++) {
				yield currSieve[i]
			}

			start += LIMIT
			top += LIMIT
		}

	}

	static setSieve (range, limit) { 
		let temp = [...range]
		temp.fill(false, 0, 2)

		for (let p = 2; p*p < limit; p++) {
			if (temp[p]) {
				for (let i = p*p; i <= limit; i+=p) {
					temp[i] = false
				}
			}
		}
		return temp
	}

	static setSieveSegment (start, top, sieve, range, primes) {
		sieve = [...range]
		let p, firstMultiple

		const iLen = primes.length
		for (let i = 0; i < iLen; i++) {
			p = primes[i]
			
			firstMultiple = Math.floor(start / p) * p
			if (firstMultiple < start) firstMultiple += p

			for (let j = firstMultiple; j <= top; j+=p) {
				sieve[j - start] = false
			}
		}
		return sieve
	}

	static filterMultiples (offset, sieve, limit) {
		let result = []
		for (let i = 0; i < limit; i++) {
			if (sieve[i]) result.push(i + offset)
		}
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


