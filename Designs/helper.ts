
export const pipe = (...fns: Function[]) => (args: any) => fns.reduce( (g, f) => f(g), args )

export const curry = (fn: Function) => {
	const curried = (...args: any[]) => {
		if ( args.length >= fn.length ) return fn.apply(this, args)
		return (...args2: any[]) => curried.apply(this, [...args, ...args2])
	}
	return curried
}

export const errorHandler = ( message: string ) => { 
	console.error(message) 
	return undefined
}

export const timeout = ( ms: number ) => new Promise( resolve => setTimeout(resolve, ms) )