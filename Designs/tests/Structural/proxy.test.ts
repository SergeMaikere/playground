import { describe, it } from 'mocha'
import { assert } from 'chai'
import { DocumentServiceProxy, RealDocumentService, Role, User } from '../../Structural/proxy'
import { faker } from '@faker-js/faker'

const makeUser = ( role: Role ): User => ( {name: faker.person.fullName(), role: role} )
const makeFilenameAndContent = () => ( {filename: faker.lorem.word(), content: faker.lorem.paragraph()} )

const realSubject = new RealDocumentService()
const admin = new DocumentServiceProxy(makeUser('admin'))
const guest = new DocumentServiceProxy(makeUser('guest'))
const { filename, content } = makeFilenameAndContent()

const addsDocu = ( subject: any ) => {
	return () => {
		subject.add(filename, content)
		assert.equal( subject.count(), 1 )
	}
}

const getDocu = ( subject: any ) => () => assert.equal( subject.get(filename), content )

const removeDocu = ( subject: any ) => {
	return () => {
		subject.delete(filename)
		assert.equal( subject.count(), 0 )
	}
}

const checkWritePermission = () => {
	assert.throw( () => guest.add(filename, content), 'Access denied no write permission' )
}

const checkReadPermission = () => {
	assert.throw( () => guest.get(filename), 'Access denied no read permission' )
}

const checkDeletePermission = () => {
	assert.throw( () => guest.delete(filename), 'Access denied no delete permission' )
}

describe( 'Proxy Pattern',
	() => {
		describe( 'Real Subject',
			() => {
				it( 'Adds a document', addsDocu(realSubject) )
				it( 'Gets a document', getDocu(realSubject) )
				it( 'Removes a document', removeDocu(realSubject) )
			}
		)

		describe( 'Proxy',
			() => {
				it( 'Checks write permission when adding', checkWritePermission )
				it( 'Adds a document', addsDocu(admin) )
				it( 'Checks read permission', checkReadPermission )
				it( 'Gets a document', getDocu(admin) )
				it( 'Checks delete permission', checkDeletePermission )
				it( 'Removes a document', removeDocu(admin) )
			}
		)
	}
)