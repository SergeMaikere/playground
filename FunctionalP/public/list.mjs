import { pipe, append, getElem, addAttribute, addClass, Text, elem, on, clearContainer, getValue, setValue } from './js/helper.js';
import { ShitPosts } from './js/call.js';

const msgMaker = (msg, index) => {
	return pipe(
		addAttribute('id', index),
		addClass('p-3'),
		addClass('bg-ivory'),
		append( Text(msg) )
	)(elem('div'))
}

const buttonClick = on('click', getElem('msg-button'))
const clearInput = setValue('')

const app = (state, output, dispatch) => {

	const appendFns = state.map( (msg, i) => append(msgMaker(msg, i)) )
	pipe(clearContainer, ...appendFns)(getElem(output))

	const stop = dispatch(
		(_e) => {
			stop()
			const newMsg = getValue('msg')
			clearInput('msg')
			const newState = [...state, newMsg]
			app(newState, output, dispatch)
		}
	)
}

app(ShitPosts, 'messages', buttonClick)
