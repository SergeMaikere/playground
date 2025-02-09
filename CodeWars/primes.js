
class Primes {

	static * stream () {

		const MAX = 472882028
		const LIMIT = Math.floor(Math.sqrt(MAX))+1
		const RANGE = [...new Array(LIMIT+1)].map( (_n, i) => i )
		const PRIMES = this.getCoreMultiples( [...RANGE], LIMIT )

		let currPrimes = PRIMES
		let start = 0
		let top = LIMIT
		let f, p, tempSet
		
		while (start < MAX) {

			if (top > MAX) top = MAX

			if (start >= LIMIT) {
				tempSet = new Set( [...RANGE].map(n => n + start) )

				for (const p of PRIMES.values()) {

					f = Math.floor( start / p ) * p
					if ( f < start ) f += p

					for (let j = f; j < top; j+=p) {
						tempSet.delete(j)
					}
				}
						
				currPrimes = tempSet
			}

			for (const n of currPrimes.values()) yield n

			start += LIMIT
			top += LIMIT
		}
	}

	static getCoreMultiples (range, limit) {
		let primes = new Set( range.slice(2) )

		for (let p = 2; p*p < limit; p++) {
			for (let i = p*p; i <= limit; i+=p) {
				primes.delete(i)
			}
		}
		return primes
	}
}


const deliverPrimes = n => {
	const stream = Primes.stream()
	for (let i = 0; i < n; i++) {
		stream.next()
	}
}

const deliverPrimesVerbose = n => {
	const stream = Primes.stream()
	let src = ''
	for (let i = 0; i < n; i++) {
		src += ` | ${stream.next().value}`
	}
	console.log(src)
}

// deliverPrimesVerbose(3000)
deliverPrimes(25e6)