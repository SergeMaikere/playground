
class Primes {

	static * stream () {

		let multies = new Map()
		let primes, nextM, p
		let n = 2

		while (true) {
			if ( !multies.has(n) ) {
				yield n
				multies.set(n*n, [n])
			}
			else {
				primes = multies.get(n)

				for (let i = 0; i < primes.length; i++) {
					p = primes[i]
					nextM = p + n

					multies.has(nextM) ? multies.get(nextM).push(p) : multies.set(nextM, [p])
				}

				multies.delete(n)
			}
			n++
		}
	}
}

const displayPrimes = n => {
	let src = ''
	const stream = Primes.stream()
	for (let i = 0; i < n; i++) {
		stream.next().value
	}
	console.log(src)
}

displayPrimes(1e6)
