/**
 *
 * The Façade pattern provides an interface which shields clients from 
 * complex functionality in one or more subsystems. It is a simple pattern 
 * that may seem trivial but it is powerful and extremely useful. It is 
 * often present in systems that are built around a multi-layer architecture.
 *
 */

/*----------  Subsystems  ----------*/
type Post = {
	userId: number
    id: number
    title: string
    body: string
}

type Comment = {
	postId: number
	id: number
	name: string
	email: string
	body: string
}

type Photo = {
	albumId: number
	id: number
	title: string
	url: string
	thumbnailUrl: string
}

type User = {
    id: number
    name: string
    username: string
    email: string
    address: {
    	street: string
      	suite: string
      	city: string,
      	zipcode: string
      	geo: {
        	lat: string
        	lng: string
      	}
    }
    phone: string
    website: string
    company: {
      	name: string
      	catchPhrase: string
      	bs: string
    }
}

export type BlogData = Post | Photo | User | Comment

export type InfoType = 'posts' | 'comments' | 'photos' | 'users'


/*----------  Facade  ----------*/
export default class BlogDataFinder {

	private api: API = new API()
	url: string = 'https://jsonplaceholder.typicode.com'

	get ( type: InfoType, id: number ) {
		if ( type === 'posts' ) return this.getBlogData('posts', id)
		if ( type === 'photos' ) return this.getBlogData('photos', id)
		if ( type === 'comments' ) return this.getBlogData('comments', id)
		return this.getBlogData('users', id)
	}

	private getBlogData = async ( type: InfoType, id: number ): Promise<BlogData> => {
		const url = `${this.url}/${type}/${id}`
		return await this.api.get(url)
	}
}


/*----------  utils  ----------*/
class API {

	get = async ( url: string ): Promise<BlogData> => {
		const res = await fetch(url)
		if ( !res.ok ) { throw new Error('`Unable to Fetch Data, Please check URL or Network connectivity!!') }
		return await res.json()
	}

	post = async ( url: string, options: RequestInit ) => {
		const res = await fetch(url, {method: 'POST', ...options})
		if ( !res.ok ) { throw new Error('Unable to Post Data, Please check URL or Network connectivity!!') }
		return await res.json()

	}

	put = async ( url: string, options: RequestInit ) => {
		const res = await fetch(url, {method: 'PUT', ...options})
		if ( !res.ok ) { throw new Error('Unable to Update Data, Please check URL or Network connectivity!!') }
		return await res.json()

	}

	delete = async ( url: string, options: RequestInit ) => {
		const res = await fetch(url, {method: 'DELETE', ...options})
		if ( !res.ok ) { throw new Error('Unable to Delete Data, Please check URL or Network connectivity!!') }
		return await res.json()
	}
}