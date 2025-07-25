
export const pipe = ( ...fns ) => args => fns.reduce((g, f) => f(g), args)

export const curry = fn => {
	const curried = (...args) => {
		if ( args.length >= fn.length ) return fn.apply(this, args)
		return (...args2) => curried.apply(this, args.concat(args2))
	}
	return curried
}

export const elem = tag => document.createElement(tag)

export const Text = str => document.createTextNode(str)

export const getElem = id => document.getElementById(id)

export const getValue = id => getElem(id).value 

export const setValue = curry( (val, id) => getElem(id).value = val )

export const clearContainer = el => {
	el.innerHTML = ''
	return el
}

export const on = curry( 
	(typeEvent, el, fn) => {
		el.addEventListener(typeEvent, fn)
		return () => el.removeEventListener(typeEvent, fn)
	} 
)

export const addClass = curry(
	(className, el) => {
		el.classList.add(className)
		return el
	}
)

export const addAttribute = curry(
	(key, value, el) => {
		el.setAttribute(key, value)
		return el
	}
)

export const append = curry( 
	(node, el) => {
		el.appendChild(node)
		return el
	} 
)

