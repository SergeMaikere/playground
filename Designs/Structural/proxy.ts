/**
 *
 * The Proxy pattern provides a surrogate or placeholder object 
 * for another object and controls access to this other object.
 *
 */

export type Role = 'admin' | 'user' | 'guest'

export type User = { name: string, role: Role }

export type Operation = 'write' | 'read' | 'delete'

class DocumentService {
	protected service: Map<string, string> = new Map()

	add = ( filename: string, content: string ) => {}
	get = ( filename: string ) => {}
	remove = ( filename: string ) => {}
	count = () => {}
}

export class RealDocumentService extends DocumentService {

	add = ( filename: string, content: string ) => {
		console.log(`Adding document ${filename} to database`)
		this.service.set(filename, content)
	}

	get = ( filename: string ) => {
		console.log(`Fetching document ${filename} from database`)
		return this.service.get(filename)
	}

	delete = ( filename: string ) => {
		console.log(`Deleting document ${filename} from database`)
		this.service.delete(filename)
	}

	count = () => this.service.size
}


export class DocumentServiceProxy extends DocumentService {

	private realDocument: RealDocumentService
	private user: User

	constructor ( user: User ) {
		super()
		this.realDocument = new RealDocumentService()
		this.user = user
	}

	private checkPermisssion = ( operation: Operation ) => {

		if ( (operation === 'write' || operation === 'delete') && this.user.role !== 'admin' )
			throw new Error(`Access denied no ${operation} permission`)

		if ( operation === 'read' && this.user.role !== 'admin' && this.user.role !== 'user' )
			throw new Error(`Access denied no read permission`)

		return true
	}

	add = ( filename: string, content: string ) => {
		this.checkPermisssion('write')
		this.realDocument.add(filename, content)
	}

	get = ( filename: string ) => {
		this.checkPermisssion('read')
		return this.realDocument.get(filename)
	}

	delete = ( filename: string ) => {
		this.checkPermisssion('delete')
		this.realDocument.delete(filename)
	}

	count = () => this.realDocument.count()
}