import { after, describe, it } from 'mocha'
import { assert } from 'chai'
import { Book, Electronic, Goodies, PriceCalculatorVisitor } from '../../Behavioral/visitor'
import Sinon from 'sinon'
import { faker } from '@faker-js/faker'


const priceCalculator = new PriceCalculatorVisitor()
const stub = Sinon.stub( faker.string, 'alphanumeric' ).returns('HM-12345')
const book = new Book('20000 lieu sous les mers', '14578B', 100, 'Jules Vernes')
const electronic  = new Electronic('BOOMBOX-3000', 'HD-123K', 100, 'Audio')
const goodies = new Goodies('Deadpool figurin', 'HD-123M', 100)

const getCalculator = ( element: any ) => {
	if ( element instanceof Book ) return priceCalculator.visitBook
	if ( element instanceof Electronic ) return priceCalculator.visitElectronic
	return priceCalculator.visitGoodies
}

const calculates = ( element: any, n: number ) => {
	const calculator = getCalculator(element)
	return () => {
		assert.equal( calculator(element), n )
	}
}

describe( 'Visitor Pattern',
	() => {
		it( 'Calculates book price', calculates(book, 90) )
		it( 'Calculates electronics price', calculates(electronic, 75) )
		it( 'Calculates goodie price', calculates(goodies, 50) )

		after( () => stub.restore())
	}
)