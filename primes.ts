
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

		while (start <= MAX) {

			if (top >= MAX) top = MAX

			if (start >= LIMIT) { 
				const sieveSeg = this.setSieveSegment(start, RANGE, PRIMES, LIMIT)
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

	static setSieveSegment (start, range, primes, limit) {
		let temp = [...range]

		const iLen = primes.length
		for (let i = 0; i < iLen; i++) {
			const p = primes[i]
			
			let firstMultiple = Math.floor(start / p) * p
			if (firstMultiple < start) firstMultiple += p
			
			const jLen = start + limit
			for (let j = firstMultiple; j <= jLen; j+=p) {
				temp[j - start] = false
			}
		}
		return temp
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
	let str = ''
	for (var i = 0; i < n; i++) {
		// str += ` |#${i}: ${stream.next().value}`
		// str = stream.next().value
		stream.next()
	}
	// console.log(str)
}

deliverPrimes(25e6)
// deliverPrimes(0)


