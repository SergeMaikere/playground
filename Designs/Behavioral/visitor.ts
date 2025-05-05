import { faker } from "@faker-js/faker"
import { errorHandler } from "../helper"
import { a0 } from "@faker-js/faker/dist/airline-BUL6NtOJ"

/*----------  Abstract Visitor Interface  ----------*/

interface ProductVisitor {
	visitBook: (elemet: Book) => any
	visitElectronic: (elemet: Electronic) => any
	visitGoodies: (elemet: Goodies) => any
}

/*----------  Abstract Element Class  ----------*/

class Product {
	name: string
	tag: string
	price: number
	readonly id: string

	constructor ( name: string, tag: string, price: number ) {
		this.name = name
		this.tag = tag
		this.price = price
		this.id = faker.string.nanoid()
	}

	accept = ( visitor: ProductVisitor ) => {}
}


/*----------  Concrete Class for Elements  ----------*/

class Book extends Product {

	author: string
	readonly isbn: string

	constructor ( name: string, tag: string, price: number, author: string ) {
		super(name, tag, price)
		this.author = author
		this.isbn = faker.string.alphanumeric({casing: 'upper', length: 6})
	}

	accept = ( visitor: ProductVisitor ) => visitor.visitBook(this) 
}

class Electronic extends Product {

	section: string
	constructor ( name: string, tag: string, price: number ) {
		super(name, tag, price)
		this.section = 'computer'
	}

	accept = ( visitor: ProductVisitor ) => visitor.visitElectronic(this)
}

class Goodies extends Product {

	constructor ( name: string, tag: string, price: number ) {
		super(name, tag, price)
	}

	accept = ( visitor: ProductVisitor ) => visitor.visitGoodies(this)
}


/*----------  Concrete Class for Visitor  ----------*/

class PriceCalculatorVisitor implements ProductVisitor {

	visitBook = ( element: Book ) => {
		const promo = element.isbn.includes('HM') ? 0.15 : 0
		return element.price - (element.price * promo)
	}

	visitElectronic = ( element: Electronic ) => {
		const promo = element.tag.includes('HD-123') ? 0.25 : 0
		return element.price - (element.price * promo)
	}

	visitGoodies = ( element: Goodies ) => {
		const promo = element.tag.includes('HD-123') ? 0.2 : 0
		return element.price - (element.price * promo)
	}
}

const PRODUCTS = [ Book, Electronic, Goodies ]
const PRODUCTS_TYPES = PRODUCTS.map( p => p.constructor.name )

type Products = typeof PRODUCTS[number]
type ProductsNames = typeof PRODUCTS_TYPES[number]

class Stock {

	static instance: Stock | null
	private books: Map<string, Book[]> = new Map()
	private electronics: Map<string, Electronic[]> = new Map()
	private goodies: Map<string, Goodies[]> = new Map()

	constructor () {
		if ( Stock.instance ) return Stock.instance
		Stock.instance = this
	}

	add = ( product: Products ) => {
		if ( product instanceof Book ) return this.addBook(product)
		if ( product instanceof Electronic ) return this.addElectronic(product)
		if ( product instanceof Goodies ) return this.addGoodies(product)
	}

	remove = ( product: Products ) => {
		if ( product instanceof Book ) return this.removeBook(product)
		if ( product instanceof Electronic ) return this.removeElectronic(product)
		if ( product instanceof Goodies ) return this.removeGoodies(product)
	}

	check = ( productInfo: {type: ProductsNames, info: string} ) => {
		if ( productInfo.type === 'Book' ) return this.askStock(this.books, productInfo.info)
		if ( productInfo.type === 'Electronic' ) return this.askStock(this.electronics, productInfo.info)
		if ( productInfo.type === 'Goodies' ) return this.askStock(this.goodies, productInfo.info)
	}
	
	private addBook = ( b: Book ) => {
		let temp = this.books.get(b.isbn)
		temp ? this.books.set(b.isbn, [...temp, b]) : this.books.set(b.isbn, [b])
		return b
	}

	private addElectronic = ( e: Electronic ) => {
		let temp = this.electronics.get(e.tag)
		temp ? this.electronics.set(e.tag, [...temp, e]) : this.electronics.set(e.tag, [e])
		return e
	}

	private addGoodies = ( g: Goodies ) => {
		let temp = this.goodies.get(g.tag)
		temp ? this.goodies.set(g.tag, [...temp, g]) : this.goodies.set(g.tag, [g])
		return g
	}

	private removeBook = ( b: Book ) => {
		if ( !this.books.get(b.isbn)?.find(item => item.id === b.id) ) return errorHandler(`Item id ${b.id} not in stock`)
		const updatedStock = this.books.get(b.isbn)?.filter(item => item.id !== b.id) as Book[]
		this.books.set(b.isbn, updatedStock)
		return b
	}

	private removeElectronic = ( e: Electronic ) => {
		if ( !this.electronics.get(e.tag)?.find(item => item.id === e.id) ) return errorHandler(`Item id ${e.id} not in stock`)
		const updatedStock = this.electronics.get(e.tag)?.filter(item => item.id !== e.id) as Electronic[]
		this.electronics.set(e.tag, updatedStock)
		return e
	}

	private removeGoodies = ( g: Goodies ) => {
		if ( !this.goodies.get(g.tag)?.find(item => item.id === g.id) ) return errorHandler(`Item id ${g.id} not in stock`)
		const updatedStock = this.goodies.get(g.tag)?.filter(item => item.id !== g.id) as Goodies[]
		this.goodies.set(g.tag, updatedStock)
		return g
	}

	private askStock = ( stock: Map<string, any>, info: string ) => {
		if ( !stock.get(info) ) return 0
		return stock.get(info).length
	}
}