import { errorHandler, getArrayRandomNumbers, getArrayRandomTexts, pipe, voyeur } from "../helper"

/*========================================
=            TEMPLATE PATTERN            =
========================================*/


interface ProcessedFormated {
	formated: any,
	timestamp: number,
	stored: boolean
}

/*----------  Abstract class  ----------*/

class DataProcessor {

	runProcess = ( data: any ) => {
		return pipe(
			this.validate,
			this.process,
			this.format,
			this.store,
			this.notifySuccess
		)(data)
	}

	isStorable: boolean = false
	isFormatable: boolean = false

	protected validate = ( data: any ): any => {
		throw new Error('Method validate must be implemented')
	}

	protected process = ( data: any ): any => {
		throw new Error('Method process must be implemented')
	}

	protected format = ( data: any ): any => {
		if ( !data || !this.isFormatable ) return data
		console.log('Formating data: ', data)
		return { formated: JSON.stringify(data), timestamp: Date.now(), stored: false }
	}

	protected store = ( data: any ) => {
		if ( !this.isStorable ) return data
		console.log('Storing data: ', data)

		//Implement storage protocol
		return { ...data, stored: true } 
	}

	protected notifySuccess = ( data: any ): any => {
		if ( !data ) return errorHandler('Data process was a failure')
		console.log('Data process was a success', data)
		return data
	}
}


/*----------  Concrete classes  ----------*/

export class NumberProcessor extends DataProcessor {

	validate = ( data: number[] ): null | number[] => {
		if ( !Array.isArray(data) || data.some(n => typeof n !== 'number') ) return errorHandler('Input must be an array of numbers')
		return data
	}

	process = ( data: number[] | undefined ): { [key: string]: number } | undefined => {
		if ( !data ) return data

		const count = data.length
		const sum = data.reduce( (total, n) => total + n, 0 )
		const avg = sum / count
		const min = Math.min(...data)
		const max = Math.max(...data)

		return { sum, avg, min, max, count}
	}

}


class TextProcessor extends DataProcessor {

	isStorable = false

	validate = ( data: string[] ): string[] | null => {
		if ( !Array.isArray(data) || data.some(t => typeof t !== 'string') ) 
			return errorHandler('Input must be an array of strings')

		return data
	}

	process = ( data: string[] | undefined ): any | undefined => {
		if ( !data ) return data

		const wordCount = data.reduce( (count, w) => count + w.split('/\s+/').length, 0 )
		const charCount = data.reduce( (count, w) => count + w.length, 0 )
		const longestString = data.reduce( (longest, str) => str.length > longest.length ? str : longest, '' )

		return { wordCount, charCount, longestString, avgLength: charCount / data.length, texts: data.length }
	}
}

export const run = () => {
	const numberProcessor = new NumberProcessor()
	const textProcessor = new TextProcessor()

	numberProcessor.runProcess(getArrayRandomNumbers(10, 100))
	textProcessor.runProcess(getArrayRandomTexts(7))
}