import { UserInput, User } from "./builder"
/*======================================
=            FACTORY METHOD            =
======================================*/

/**
 *
 * The key objective of the Factory Method is extensibility. Factory Methods are frequently 
 * used in applications that manage, maintain, or manipulate collections of objects that 
 * are different but at the same time have many characteristics (i.e. methods and properties) in common. 
 * An example would be a collection of documents with a mix of Xml documents, Pdf documents, and Rtf documents.


 *
 */


interface AdminInput extends User { key: string }
interface SellerInput extends User { shopAddress: string, contact_No: string }
interface CustomerInput extends User { address: string }

type UserInfo = Omit<User, 'firstName' | 'lastName'> & { name: string }
type AdminInfo = UserInfo & { key: string }
type SellerInfo = UserInfo & { shopAddress: string, contact_No: string }
type CustomerInfo = UserInfo & { address: string }

enum Role {
	admin = 'admin',
	customer = 'customer',
	seller = 'seller'
}

class Employee {

	protected firstName: string
	protected lastName: string
	protected email: string
	protected password: string

	constructor (userInfo: User) {
		this.firstName = userInfo.firstName
		this.lastName = userInfo.lastName
		this.email = userInfo.email
		this.password = userInfo.password
	}

	get fullName ():string {
		return `${this.firstName} ${this.lastName}` 
	}

	get basicInfo (): UserInfo {
		return {
			name: this.fullName,
			email: this.email,
			password: this.password
		}
	}
}

class Admin extends Employee {
	private readonly key: string

	constructor (userInfo: AdminInput) {
		super(userInfo)
		this.key = userInfo.key
	}

	get info (): AdminInfo {
		return { ...this.basicInfo, key: this.key }
	}
}

class Customer extends Employee {
	private readonly address: string

	constructor (userInfo: CustomerInput) {
		super(userInfo)
		this.address = userInfo.address
	}

	get info (): CustomerInfo {
		return { ...this.basicInfo, address: this.address }
	}
}

class Seller extends Employee {
	private shopAddress: string
	private contact_No: string

	constructor (userInfo: SellerInput) {
		super(userInfo)
		this.shopAddress = userInfo.shopAddress
		this.contact_No = userInfo.contact_No
	}

	get info (): SellerInfo {
		return {
			...this.basicInfo,
			shopAddress: this.shopAddress,
			contact_No: this.contact_No
		}
	}
}

export class EmployeeMatrice {

	static create = (role: string, userInfo: UserInput): Admin | Seller | Customer => {
		if ( role === Role.admin ) return this.makeAdmin(userInfo)
		if ( role === Role.seller ) return this.makeSeller(userInfo)
		if ( role === Role.customer ) return this.makeCustomer(userInfo)

		throw new Error(`The role ${role} does not exists`)
	}

	private static makeEmployee = ( userInfo: UserInput ): User => {
		return {
			firstName: userInfo.firstName,
			lastName: userInfo.lastName,
			email: userInfo.email,
			password: userInfo.password,
		}
	}

	private static makeAdmin = ( userInfo: UserInput ): Admin => {
		return new Admin( {...this.makeEmployee(userInfo), key: userInfo.key as string} )
	}

	private static makeSeller = ( userInfo: UserInput ): Seller => {
		let mySeller = {
			...this.makeEmployee(userInfo),
			shopAddress: userInfo.shopAddress as string,
			contact_No: userInfo.contact_No as string
		}
		return new Seller(mySeller)
	}

	private static makeCustomer = ( userInfo: UserInput ): Customer => {
		return new Customer( {...this.makeEmployee(userInfo), address: userInfo.address as string} )
	}
}