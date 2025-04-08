import { faker } from "@faker-js/faker/."


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
        	lat: number
        	lng: number
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

type BlogData = Post | Photo | User | Comment

type InfoType = 'posts' | 'comments' | 'photos' | 'users'

export default class BlogDataFinder {

	type: InfoType
	url: string

	constructor ( type: InfoType ) {
		this.url = 'https://jsonplaceholder.typicode.com'
		this.type = type
	}

	get (id: number) {
		if ( this.type === 'posts' ) return this.getBlogData('posts', id)
		if ( this.type === 'photos' ) return this.getBlogData('photos', id)
		if ( this.type === 'comments' ) return this.getBlogData('comments', id)
		if ( this.type === 'users' ) return this.getBlogData('users', id)
		throw new Error('Unknown type of blog data')
	}

	private getBlogData = ( type: InfoType, id: number ): Promise<BlogData> => {
		const url = `${this.url}/${type}/`
		return this.fetchMe(url, id)
	}

	private fetchMe = ( url: string, id: number ): Promise<BlogData> => {
		return fetch(`${url}${id}`)
		.then( 
			res => {
				if ( !res.ok ) { throw new Error('`Unable to Fetch Data, Please check URL or Network connectivity!!') }
				return res.json()
			} 
		)
		.catch( err => console.error(err) )
	}
}