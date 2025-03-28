import { UserInput, User } from "./builder"
/*======================================
=            FACTORY METHOD            =
======================================*/


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
	private role: string
	private userInfo: UserInput
	private employee: Admin | Customer | Seller

	constructor (role: string, userInfo: UserInput) {
		this.role = role
		this.userInfo = userInfo
		this.employee = this.create()
	}

	get info () {
		return this.employee.info
	}

	private create = (): Admin | Seller | Customer => {
		if ( this.role === Role.admin ) return this.makeAdmin()
		if ( this.role === Role.seller ) return this.makeSeller()
		if ( this.role === Role.customer ) return this.makeCustomer()

		throw new Error(`The role ${this.role} does not exists`)
	}

	private makeEmployee = (): User => {
		return {
			firstName: this.userInfo.firstName,
			lastName: this.userInfo.lastName,
			email: this.userInfo.email,
			password: this.userInfo.password,
		}
	}

	private makeAdmin = (): Admin => {
		return new Admin( {...this.makeEmployee(), key: this.userInfo.key as string} )
	}

	private makeSeller = (): Seller => {
		let mySeller = {
			...this.makeEmployee(),
			shopAddress: this.userInfo.shopAddress as string,
			contact_No: this.userInfo.contact_No as string
		}
		return new Seller(mySeller)
	}

	private makeCustomer = (): Customer => {
		return new Customer( {...this.makeEmployee(), address: this.userInfo.address as string} )
	}
}