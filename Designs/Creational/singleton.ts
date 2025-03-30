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


class ConfigManager {

	static instance: ConfigManager | null
	private settings!: Settings

	constructor () {
		if ( ConfigManager.instance ) return ConfigManager.instance

		ConfigManager.instance = this

		this.settings = {
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
			plugins: [],
		}
	}

	get = (key: string): any => this.settings[key as keyof Settings]	

	set = (key: string, value: never) => this.settings[key as keyof Settings] = value

	toJSON = (): string => JSON.stringify( this.settings, null, 4 )

	print = () => console.log( '\n' + this.toJSON() )
}

export const config1 = Object.freeze( new ConfigManager() )
export const config2 = Object.freeze( new ConfigManager() )
