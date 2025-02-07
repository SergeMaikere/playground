
class Primes {

	static * stream () {

		const MAX = 472882028
		const LIMIT = Math.floor(Math.sqrt(MAX))+1
		const RANGE = new Array(LIMIT+1).fill(true)

		let start = 0
		let top = LIMIT
		let f, p, sieve

		sieve = [...RANGE]
		sieve.fill(false, 0, 2)

		for (let p = 2; p*p < LIMIT; p++) {
			if (sieve[p]) {
				for (let i = p*p; i <= LIMIT; i+=p) {
					sieve[i] = false
				}
			}
		}
		
		let PRIMES = []
		for (let i = 2; i < LIMIT; i++) {
			if (sieve[i]) PRIMES.push(i)
		}

		let currPrimes = PRIMES

		while (start < MAX) {

			if (top > MAX) top = MAX

			if (start >= LIMIT) { 
				sieve = [...RANGE]

				const len = PRIMES.length
				for (let i = 0; i < len; i++) {
					p = PRIMES[i]

					f = Math.floor( start / p ) * p
					if ( f < start ) f += p

					for (let j = f; j < top; j+=p) {
						sieve[j - start] = false
					}
				}

				currPrimes = []
				for (let i = 0; i < LIMIT; i++) {
					if (sieve[i]) currPrimes.push(i + start)
				}
			}

			const len = currPrimes.length
			for (let i = 0; i < len; i++) {
				yield currPrimes[i]
			}

			start += LIMIT
			top += LIMIT
		}

	}
}


const deliverPrimes = n => {
	const stream = Primes.stream()
	for (let i = 0; i < n; i++) {
		stream.next()
	}
}

deliverPrimes(25e6)