export default class V {

	private static reEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	static isString = (input: string | null): boolean => input ? input.length > 0 && typeof input === 'string' : false

	static isValidName = (name: string): boolean => this.isString(name)

	static isEmail = (email: string | null): boolean => {
		if ( !email ) return false
		return String(email).toLowerCase().match(this.reEmail) ? true : false
	}

	static isDate = (date: Date | null): boolean => {
		if ( !date ) return false
		return date instanceof Date && !isNaN(date.valueOf())
	}

	static isPassword = (pswd: string | null) => this.isString(pswd)

}