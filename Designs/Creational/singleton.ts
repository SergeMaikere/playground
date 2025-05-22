 import { faker } from "@faker-js/faker"

/*=================================
=            SINGLETON            =
=================================*/


type Settings = {
	apiUrl: string
	retryAtttemps: number
	darkMode: boolean
	theme: {
		extend: {
			fontFamily: {
		    	poppins: string
		    	rajdhani: string
		  	},
		  	colors: {
		    	primary: string
		    	secondary: string
		    	tertiary: string
		    	quaternary: string
		  	}
		}
	},
	plugins: string[],
}

export default class ConfigManager {

	static instance: ConfigManager
	private _settings: Settings = {
		//default settings
		apiUrl: faker.internet.url(),
		retryAtttemps: 3,
		darkMode: true,
		theme: {
			extend: {
				fontFamily: {
			    	poppins: faker.lorem.words(2),
			    	rajdhani: faker.lorem.words(2)
			  	},
			  	colors: {
			    	primary: faker.string.hexadecimal(),
			    	secondary: faker.string.hexadecimal(),
			    	tertiary: faker.string.hexadecimal(),
			    	quaternary: faker.string.hexadecimal()
			  	}
			}
		},
		plugins: ['myPlugin'],
	}

	constructor () {
		if ( ConfigManager.instance ) return ConfigManager.instance
		ConfigManager.instance = this
	}

	get = <K extends keyof Settings>(key: K): any => this._settings[key]	

	set = <K extends keyof Settings>(key: K, value: Settings[K]) => this._settings[key] = value

	get settings (): Settings { return this._settings }

	toJSON = (): string => JSON.stringify( this._settings, null, 4 )

	print = () => console.log( '\n' + this.toJSON() )
}

