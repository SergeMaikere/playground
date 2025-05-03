import { faker } from "@faker-js/faker";

export const pipe = (...fns: Function[]) => (args: any) => fns.reduce( (g, f) => f(g), args )

export const curry = (fn: Function) => {
	const curried = (...args: any[]) => {
		if ( args.length >= fn.length ) return fn.apply(this, args)
		return (...args2: any[]) => curried.apply(this, [...args, ...args2])
	}
	return curried
}

export const voyeur = (name: string, x: any): any => {
	console.log('\n' + name.toUpperCase())
	console.group()
	console.log(x)
	console.groupEnd()
	return x
}

export const errorHandler = ( message: string ) => { 
	console.error(message) 
	return undefined
}

export const timeout = ( ms: number ) => new Promise( resolve => setTimeout(resolve, ms) )

export const getArrayRandomNumbers = ( length: number, max: number ): number[] => {
	return [ ...Array(length) ].map( _i => Math.floor(Math.random() * max) )
}

export const getArrayRandomTexts = ( length: number ): string[] => {
	return [ ...Array(length) ].map( _i => faker.lorem.sentences(3) )
} 