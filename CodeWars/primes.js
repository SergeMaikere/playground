class Primes {

	static * stream () {

		const MAX = 1000
		const SQRT = Math.floor( Math.sqrt(MAX) ) + 1
		const RANGE = Array( MAX ).fill(false).fill(true, 2, 4)

		let primes = []
		let sieve = [...RANGE]

		for (let x = 1; x < SQRT; x++) {
			for (let y = 1; y < SQRT; y++) {
				this.#findPrimesAtkinWay( sieve, MAX, x, y )
			}
		}


		for (let i = 5; i < SQRT; i++) {
			if ( sieve[i] ) {
				let s = i*i
				for (var j = s; j < MAX; j+=s) {
					sieve[j] = false
				}
			}
		}

		for (let k = 0; k < MAX; k++) {
			if ( sieve[k] ) primes.push(k)
		}

		for (let p of primes) yield p
	}

	static #findPrimesAtkinWay = (sieve, max, x, y) => {

		let n = 4 * x * x + y * y
		if ( (n < max) && ((n % 12 == 1) || (n % 12 == 5)) ) {
			sieve[n] = true
		}

		n = 3 * x * x + y * y
		if ( (n < max) && (n % 12 == 7) ) {
			sieve[n] = true
		}

		n = 3 * x * x - y * y
		if ( (x > y) && (n < max) && (n % 12 == 11) ) {
			sieve[n] = true
		}
	}
}

const displayPrimes = (n) => {
	let src = ''
	const stream = Primes.stream()
	for (let i = 0; i < n; i++) {
		src += `| ${stream.next().value}`
	}
	console.log({src})
}

displayPrimes(100)